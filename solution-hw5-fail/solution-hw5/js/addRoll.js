import {rolls} from "./rollsData.js"

const cart = new Set();

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

let roll1 = new Roll ("Original", "Sugar Milk", 1, 2.49)
let roll2 = new Roll ("Walnut", "Vanilla Milk", 12, 3.49)
let roll3 = new Roll ("Raisin", "Sugar Milk", 3, 2.99)
let roll4 = new Roll ("Apple", "Original", 3, 3.49)

const bigDiv = document.querySelector(".cart");

function updateCart (roll) {
    const type = roll.type;
    const glaze = roll.glazing;
    const size = roll.size;
    const basePrice = roll.basePrice;

    const divItem = document.createElement("div");
    const divImgButton = document.createElement("div");
    const divInfo = document.createElement("div");

    // create div with image and button
    const image = document.createElement("img");
    image.src = rolls[type]["imageFile"];
    image.classList.add("img");
    divImgButton.appendChild(image);

    const button = document.createElement("button");
    button.innerText = "remove";
    button.classList.add("remove");
    divImgButton.appendChild(button);

    // create div with three info fields

    const item = document.createElement("p");
    item.innerText = type;
    item.classList.add("info")
    divInfo.appendChild(item);

    divItem.appendChild(divInfo);
    divItem.appendChild(divImgButton);

    const itemGlazing = document.createElement("p");
    itemGlazing.innerText = glaze;
    itemGlazing.classList.add("info")
    divInfo.appendChild(itemGlazing);

    const itemSize = document.createElement("p")
    itemSize.innerText = size;
    itemSize.classList.add("info")
    divInfo.appendChild(itemSize);

    
    bigDiv.appendChild(divItem);

}

updateCart(roll1);
updateCart(roll2);
updateCart(roll3);
updateCart(roll4);

