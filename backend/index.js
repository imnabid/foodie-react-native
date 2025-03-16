import express from "express";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
import {
  Order,
  Food,
  Tag,
  Ingredient,
  Drink,
  Address,
  Offer,
  Side,
  FoodAndSides,
  FoodAndDrinks,
  OrderIndividual,
  User,
} from "./schema.js";
import { auth } from "./authentications.js";

import { WebSocketServer } from "ws";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

//custom routers
app.use(auth);
//

mongoose.connect(
  "mongodb+srv://sujanasadmin:adminsjn@cluster0.j32kt.mongodb.net/rnFood",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("type", req.body.type);
    if (req.body.type === "food") cb(null, "./static/foods");
    else if (req.body.type === "tag") cb(null, "./static/tags");
    else cb(null, "./static");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const removeComma = (text) => {
  if (!text) return [];
  return text.split(",");
};

//api endpoints
const baseURL = "http://localhost:9002";
// const baseURL = "http://192.168.1.66:9002";

app.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("req to update user", id, req.body);
    console.log(req.body.type);
    const dataType = req.body.type;
    const user = await User.findById(id);
    console.log("type", dataType);
    if (dataType === "address") {
      const { location, landmark, phoneNumber } = req.body.address;
      user.phoneNumber = req.body.phoneNumber;
      await user.save();
      let address = await Address.findById(user.address);
      address.location = location;
      address.landmark = landmark;
      await address.save();
      return res.json(address);
    } else if (dataType === "allergies") {
      const allergies = req.body.allergies;
      user.allergies = allergies;
      console.log("allergies", allergies);
      await user.save();
      return res.json(allergies);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/orders/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("req to delete order", id);
    // return
    const order = await Order.findByIdAndUpdate(id, { status: "completed" });
    await order.save();
    // await Order.findByIdAndDelete(id);
    // order.status = 'completed'
    // await order.save()
    res.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const wss = new WebSocketServer({ port: 9003 });

wss.on("connection", (ws) => {
  console.log("connected");
  const interval = setInterval(async () => {
    const orders = await Order.find({ status: "pending" })
      .populate({
        path: "user",
        select: "fullName phoneNumber email",
      })
      .populate({
        path: "order",
        populate: {
          path: "food",
          model: "Food",
          populate: [
            { path: "sides", model: "Side" },
            { path: "drinks", model: "Drink" },
          ],
        },
      })
      .populate("address")
      .sort({ orderedDate: 1 });
    ws.send(JSON.stringify(orders));
  }, 5000);

  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval); // Stop sending messages when client disconnects
  });
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({ status: "pending" })
      .populate({
        path: "user",
        select: "fullName phoneNumber email",
      })
      .populate({
        path: "order",
        populate: {
          path: "food",
          model: "Food",
          populate: [
            { path: "sides", model: "Side" },
            { path: "drinks", model: "Drink" },
          ],
        },
      })
      .populate("address")
      .sort({ orderedDate: 1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("req to fetch order", id);
    const orders = await Order.find({ user: id })
      .populate({
        path: "order",
        populate: {
          path: "food",
          model: "Food",
          populate: [
            { path: "sides", model: "Side" },
            { path: "drinks", model: "Drink" },
          ],
        },
      })
      .sort({ orderedDate: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const data = req.body;
    console.log("data", data);

    const orders = [];
    for (const item of data.items) {
      const order = await OrderIndividual.create({
        food: item._id,
        quantity: item.quantity,
        total: item.total,
      });
      orders.push(order);
    }

    await Order.create({
      user: data.userId,
      order: orders,
      note: data.notes,
      total: data.total,
      address: data.address,
    });

    res.json({ message: "Order added successfully" });
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/upload-food", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    const path = `foods/${file.filename}`;
    let data = req.body;
    console.log(data);

    const food = new Food({
      ...data,
      image: path,
      tags: removeComma(data.tags),
      ingredients: removeComma(data.ingredients),
      sides: removeComma(data.sides),
      drinks: removeComma(data.drinks),
      price: parseInt(data.price),
      offerPercent: parseInt(data.offerPercent),
    });
    await food.save();

    res.json({ message: "Food added successfully" });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/foods/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("req to delete food", id);
    await Food.findByIdAndDelete(id);
    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/foods/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const offerPercent = req.body.offerPercent;
    const sides = req.body.sides;
    const drinks = req.body.drinks;
    console.log("new percent", offerPercent);
    console.log("sides", sides);
    console.log("drinks", drinks);
    let food = await Food.findById(id);
    food.offerPercent = offerPercent;
    food.sides = sides;
    food.drinks = drinks;
    await food.save();
    const output = await Food.findById(id).populate("sides").populate("drinks");
    output.image = `${baseURL}/${output.image}`;
    res.json(output);
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get("/foods", async (req, res) => {
//   try {
//     let foods = await Food.find({})
//       .populate("tags")
//       .populate("ingredients")
//     const offers = await Offer.find().populate('food')
//     //kinda cruicial technique to fetch foods with offers and non offeres together
//     let newFoods = []
//     foods.forEach(food => {
//       const offer = offers.find(offer => offer.food.id === food.id)
//       food.image = `${baseURL}/${food.image}`
//       if (offer) {
//         newFoods.push({ ...food._doc, offerPercent: offer.offerPercent })
//       }
//       else
//         newFoods.push({ ...food._doc })
//     })
//     res.json(newFoods)
//   } catch (error) {
//     console.error("Error fetching food items:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.get("/foods", async (req, res) => {
  try {
    let foods = await Food.find({})
      .populate("tags")
      .populate("ingredients")
      .populate("sides")
      .populate("drinks");
    foods.forEach((food) => {
      food.image = `${baseURL}/${food.image}`;
    });
    res.json(foods);
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/tags", async (req, res) => {
  try {
    const tags = await Tag.find();
    tags.forEach((tag) => {
      tag.image = `${baseURL}/${tag.image}`;
    });
    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/tags", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    console.log("file", file, req.body);
    const path = `tags/${file.filename}`;
    const tag = new Tag({ ...req.body, image: path });
    console.log(tag);
    await tag.save();
    res.json({ message: "Tag added successfully" });
  } catch (error) {
    console.error("Error adding tag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/tags/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("req to delete tag", id);
    await Tag.findByIdAndDelete(id);
    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/offers", async (req, res) => {
  //this need revision
  try {
    let foods = await Food.find({}).populate("tags").populate("ingredients");
    const offers = await Offer.find().populate("food");
    let newFoods = [];
    foods.forEach((food) => {
      const offer = offers.find((offer) => offer.food.id === food.id);
      food.image = `${baseURL}/${food.image}`;
      if (offer) {
        newFoods.push({ ...food._doc, offerPercent: offer.offerPercent });
      }
    });
    res.json(newFoods);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/tag-foods", async (req, res) => {
  try {
    const tagId = req.query.id;
    const foods = await Food.find({ tags: tagId }).populate("tags");
    if (foods.length === 0) {
      return res.json([]);
    }
    foods.forEach((food) => {
      food.image = `${baseURL}/${food.image}`;
    });
    res.json(foods);
  } catch (error) {
    console.error("Error fetching tag foods:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/sides", async (req, res) => {
  try {
    const sides = await Side.find();
    res.json(sides);
  } catch (error) {
    console.error("Error fetching sides:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/sides", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const data = req.body;
    const side = new Side({
      name: data.name,
      price: parseFloat(data.price),
    });
    await side.save();
    res.json({ message: "Side added successfully" });
  } catch (error) {
    console.error("Error adding side:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/sides/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const foodAndSides = await FoodAndSides.findOne({ food: id }).populate(
      "sides"
    );
    if (foodAndSides) res.json(foodAndSides.sides);
  } catch (error) {
    console.error("Error fetching sides:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/sides/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("req to delete side", id);
    await Side.findByIdAndDelete(id);
    res.json({ message: "Side deleted successfully" });
  } catch (error) {
    console.error("Error deleting side:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/drinks", async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.json(drinks);
  } catch (error) {
    console.error("Error fetching drinks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/drinks", async (req, res) => {
  try {
    const data = req.body;
    const drink = new Drink({
      name: data.name,
      price: parseFloat(data.price),
    });
    await drink.save();
    res.json({ message: "Drink added successfully" });
  } catch (error) {
    console.error("Error adding drink:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/drinks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const foodAndDrinks = await FoodAndDrinks.findOne({ food: id }).populate(
      "drinks"
    );
    if (foodAndDrinks) res.json(foodAndDrinks.drinks);
  } catch (error) {
    console.error("Error fetching drinks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/drinks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("req to delete drink", id);
    await Drink.findByIdAndDelete(id);
    res.json({ message: "Drink deleted successfully" });
  } catch (error) {
    console.error("Error deleting drink:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/allergies", async (req, res) => {
  try {
    const sides = await Ingredient.find();
    res.json(sides);
  } catch (error) {
    console.error("Error fetching allergies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(9002, () => {
  console.log("Backend server started at port 9002");
});
