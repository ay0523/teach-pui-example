const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "products/original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "products/apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "products/raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "products/walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "products/double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "products/strawberry-cinnamon-roll.jpg"
    }    
}
const original = {
    type: "Original",
    glazingPrice: 0
};

const sugarMilk = {
    type: "Sugar Milk",
    glazingPrice: 0
};

const vanilla = {
    type: "Vanilla Milk",
    glazingPrice: 0.50
};

const chocolate = {
    type: "Double Chocolate",
    glazingPrice: 1.50
};

const pack1 = {
    type: "1",
    packPrice: 1
};

const pack3 = {
    type: "3",
    packPrice: 3
};

const pack6 = {
    type: "6",
    packPrice: 5
};

const pack12 = {
    type: "12",
    packPrice: 10
};

const glazingOptions = [original, sugarMilk, vanilla, chocolate];
const packOptions = [pack1, pack3, pack6, pack12];