const foodItems = [
    {
        id: 1,
        name: "Chicken Momo",
        description: "Steamed dumplings filled with minced chicken and spices",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAIrmVV-U3uth9y0beOshLdlI6fnKqFDhhxnsRFdnl3w&s",
        tag: [4, 2],
        price: 120,
        offer: true,
        offerPer: 10,
        sides: [
            { name: "Spring Rolls", price: 120 },
            { name: "Salad", price: 100 },
            { name: "Soup", price: 100 }
        ],
        drinks: [
            { name: "Iced Tea", price: 120 },
            { name: "Lemonade", price: 50 },
            { name: "Water", price: 20 }
        ],
        ingredients: [
            "Minced chicken",
            "Dumpling wrappers",
            "Ginger",
            "Garlic",
            "Onion",
            "Salt",
            "Pepper",
            "Soy sauce"
        ]
    },
    {
        id: 2,
        name: "Veg Chowmein",
        description: "Stir-fried noodles with mixed vegetables and spices",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZu1vp9OYM5Mj173dwR8Qy9Qa34ZcsLqNmvflXcgFzOA&s",
        tag: [5, 2],
        price: 150,
        offer: false,
        sides: [
            { name: "Spring Rolls", price: 120 },
            { name: "Vegetable Dumplings", price: 100 },
            { name: "Cucumber Salad", price: 80 }
        ],
        drinks: [
            { name: "Green Tea", price: 40 },
            { name: "Soda", price: 50 },
            { name: "Lemonade", price: 50 },
            { name: "Water", price: 25 }
        ],
        ingredients: [
            "Noodles",
            "Mixed vegetables (e.g., carrots, cabbage, bell peppers)",
            "Ginger",
            "Garlic",
            "Soy sauce",
            "Vegetable oil",
            "Salt",
            "Pepper"
        ]
    },
    {
        id: 3,
        name: "Espresso",
        description: "Strong black coffee made by forcing hot water through finely-ground coffee beans",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3sswmr2jT3q8OCL6jb-KR-9vqrYfBCTMEfJXv64gQ6A&s",
        tag: [1, 6],
        price: 100,
        offer: true,
        offerPer: 15,
        sides: [
            { name: "Biscotti", price: 120 },
            { name: "Chocolate", price: 100 },
            { name: "Croissant", price: 100 }
        ],
        drinks: [
            { name: "Water", price: 20 },
            { name: "Amaro", price: 50 },
            { name: "Fresh Juice", price: 80 }
        ],
        ingredients: [
            "Finely-ground coffee beans",
            "Hot water"
        ]
    },
    {
        id: 4,
        name: "Thukpa",
        description: "Spicy Tibetan noodle soup with vegetables or meat",
        image: "https://images.slurrp.com/prodrich_article/stl221ehtz.webp?impolicy=slurrp-20210601&width=880&height=500",
        tag: [5, 6],
        price: 180,
        offer: false,
        sides: [
            { name: "Momos", price: 100 },
            { name: "Spring Rolls", price: 120 },
            { name: "Pickled Vegetables", price: 80 }
        ],
        drinks: [
            { name: "Herbal Tea", price: 40 },
            { name: "Water", price: 20 },
            { name: "Lemonade", price: 50 }
        ],
        ingredients: [
            "Noodles",
            "Vegetables (e.g., carrots, cabbage, bell peppers)",
            "Meat (optional)",
            "Ginger",
            "Garlic",
            "Soy sauce",
            "Chili sauce",
            "Salt",
            "Pepper"
        ]
    },
    {
        id: 5,
        name: "Margherita Pizza",
        description: "Classic pizza topped with tomato sauce, mozzarella cheese, and fresh basil",
        image: "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
        tag: [3, 2],
        price: 200,
        offer: true,
        offerPer: 20,
        sides: [
            { name: "Garlic Bread", price: 100 },
            { name: "Caesar Salad", price: 150 },
            { name: "Mozzarella Sticks", price: 120 }
        ],
        drinks: [
            { name: "Red Wine", price: 180 },
            { name: "Beer", price: 150 },
            { name: "Soda", price: 50 },
            { name: "Water", price: 20 }
        ],
        ingredients: [
            "Pizza dough",
            "Tomato sauce",
            "Mozzarella cheese",
            "Fresh basil",
            "Olive oil",
            "Salt",
            "Pepper"
        ]
    },
    {
        id: 6,
        name: "Veggie Burger",
        description: "Grilled veggie patty with lettuce, tomato, onion, and sauce in a sesame seed bun",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400/972a37599772cdc7df93a0855ad87591",
        tag: [2],
        price: 180,
        offer: false,
        sides: [
            { name: "Fries", price: 80 },
            { name: "Onion Rings", price: 70 },
            { name: "Coleslaw", price: 60 }
        ],
        drinks: [
            { name: "Soda", price: 50 },
            { name: "Milkshake", price: 100 },
            { name: "Iced Tea", price: 120 },
            { name: "Water", price: 20 }
            ],
            ingredients: [
            "Veggie patty",
            "Lettuce",
            "Tomato",
            "Onion",
            "Sesame seed bun",
            "Sauce (e.g., ketchup, mayo)",
            "Salt",
            "Pepper"
            ]
            },
            {
            id: 7,
            name: "Chicken Chowmein",
            description: "Stir-fried noodles with chicken, vegetables, and savory sauce",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStw-K2zmxZULaBiEkJB0nE2Ar4iFC1Lc-TVuICtBd9Pw&s",
            tag: [5, 2],
            price: 170,
            offer: true,
            offerPer: 10,
            sides: [
            { name: "Spring Rolls", price: 120 },
            { name: "Fried Wontons", price: 100 },
            { name: "Cucumber Salad", price: 80 }
            ],
            drinks: [
            { name: "Green Tea", price: 40 },
            { name: "Soda", price: 50 },
            { name: "Lemonade", price: 50 },
            { name: "Water", price: 25 }
            ],
            ingredients: [
            "Chicken",
            "Noodles",
            "Mixed vegetables (e.g., carrots, cabbage, bell peppers)",
            "Ginger",
            "Garlic",
            "Soy sauce",
            "Vegetable oil",
            "Salt",
            "Pepper"
            ]
            },
            {
            id: 8,
            name: "Cappuccino",
            description: "Espresso mixed with hot milk and topped with foamed milk",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2DgcTMWetlhLu_XGvCk2i8uqtrGZl_wH1uEk4MzaHhw&s",
            tag: [1, 6],
            price: 120,
            offer: false,
            sides: [
            { name: "Biscotti", price: 120 },
            { name: "Muffins", price: 100 },
            { name: "Croissant", price: 100 }
            ],
            drinks: [
            { name: "Water", price: 20 },
            { name: "Orange Juice", price: 80 },
            { name: "Herbal Tea", price: 40 }
            ],
            ingredients: [
            "Espresso",
            "Hot milk",
            "Foamed milk"
            ]
            },
            {
            id: 9,
            name: "Veg Momos",
            description: "Steamed dumplings filled with mixed vegetables and spices",
            image: "https://resize.indiatvnews.com/en/resize/oldbucket/1200_-/lifestylelifestyle/IndiaTv94add1_Momos-main-pic.jpg",
            tag: [4, 2],
            price: 100,
            offer: false,
            sides: [
            { name: "Spring Rolls", price: 120 },
            { name: "Pickled Vegetables", price: 80 },
            { name: "Salad", price: 100 }
            ],
            drinks: [
            { name: "Iced Tea", price: 120 },
            { name: "Lemonade", price: 50 },
            { name: "Water", price: 20 }
            ],
            ingredients: [
            "Mixed vegetables (e.g., cabbage, carrots, bell peppers)",
            "Dumpling wrappers",
            "Ginger",
            "Garlic",
            "Onion",
            "Salt",
            "Pepper",
            "Soy sauce"
            ]
            },
            {
            id: 10,
            name: "Chicken Chowder",
            description: "Creamy chicken soup with vegetables and herbs",
            image: "https://www.barleyandsage.com/wp-content/uploads/2021/12/chicken-corn-chowder-1200x1200-1.jpg",
            tag: [6],
            price: 150,
            offer: true,
            offerPer: 15,
            sides: [
            { name: "Bread Rolls", price: 100 },
            { name: "Garlic Bread", price: 100 },
            { name: "Side Salad", price: 120 }
            ],
            drinks: [
            { name: "White Wine", price: 180 },
            { name: "Lemonade", price: 50 },
            { name: "Water", price: 20 }
            ],
            ingredients: [
            "Chicken",
            "Potatoes",
            "Carrots",
            "Celery",
            "Onion",
            "Chicken broth",
            "Cream",
            "Herbs (e.g., thyme, parsley)",
            "Salt",
            "Pepper"
            ]
            }
            ];
            // const tags = [
            //     { id: 1, name: 'Coffee', image: path.join(__dirname, 'images/tagimage/coffee.png') },
            //     { id: 2, name: 'Fastfood', image: path.join(__dirname, 'images/tagimage/Fastfood.png') },
            //     { id: 3, name: 'Pizza', image: path.join(__dirname, 'images/tagimage/pizzal.png') },
            //     { id: 4, name: 'Momo', image: path.join(__dirname, 'images/tagimage/Momo.png') },
            //     { id: 5, name: 'Noodles', image: path.join(__dirname, 'images/tagimage/ramen.png') },
            //     { id: 6, name: 'Breakfast', image: path.join(__dirname, 'images/tagimage/Breakfast.png') }
            //   ];
              