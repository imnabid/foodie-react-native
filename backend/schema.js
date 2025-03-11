import mongoose from "mongoose";

//Authentications
const userSchema = new mongoose.Schema({
    fullName: { type: String },
    phoneNumber: { type: Number, required: [true, 'Please enter the number'] },
    email: { type: String, required: [true, 'Please enter the email'], unique: true },
    password: { type: String, required: [true, 'Please enter the password'] },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    allergies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
    otpRegistrationNumber: { type: Number },
    isOtpRegistrationVerified: { type: Boolean }
})

export const User = mongoose.model("User", userSchema);

//Foods
const tagSchema = new mongoose.Schema({
    name: String,
    image: String,
    image: String,
});

const foodSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    sides: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Side' }],
        default: []
    },
    drinks: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drink' }],
        default: []
    },
    price: Number,
    offerPercent: { type: Number, default: 0 },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
    orders_count: { type: Number, default: 0 },

});


const offerSchema = new mongoose.Schema({
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    offerPercent: Number,
})

const orderIndividualSchema = new mongoose.Schema({
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    quantity: Number,
    total: Number,
})
export const OrderIndividual = mongoose.model('OrderIndividual', orderIndividualSchema);

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderIndividual' }],
    note: String,
    orderedDate: { type: Date, default: Date.now },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    total: Number,
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});


const addressSchema = new mongoose.Schema({
    location: { type: String, required: true },
    landmark: { type: String, default: '' }
});

const drinkSchema = new mongoose.Schema({
    name: String,
    price: Number

});

const sideSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const ingredientSchema = new mongoose.Schema({
    name: String
})

const foodAndSides = new mongoose.Schema({
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    sides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Side', default: [] }]
})

const foodAndDrinks = new mongoose.Schema({
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    drinks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drink', default: [] }]
})

export const Food = mongoose.model("Food", foodSchema);
export const Order = mongoose.model("Order", orderSchema);
export const Tag = mongoose.model('Tag', tagSchema);
export const Address = mongoose.model("Address", addressSchema);
export const Drink = mongoose.model('Drink', drinkSchema);
export const Side = mongoose.model('Side', sideSchema);
export const Ingredient = mongoose.model('Ingredient', ingredientSchema);
export const Offer = mongoose.model('Offer', offerSchema);
export const FoodAndSides = mongoose.model('FoodAndSide', foodAndSides);
export const FoodAndDrinks = mongoose.model('FoodAndDrink', foodAndDrinks);