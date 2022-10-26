let glazePrice = 0;
let sizePrice = 0;

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

const cart = new Set();
var finalPrice = 0;

function addNewItem(rollType, rollGlazing, packSize, basePrice) {
    const item = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.add(item);
    return item;
}

function findPrice(item){
    for (let i = 0; i < packOptions.length; i+= 1) {
        if (item.glazing == glazingOptions[i].type){
           glazePrice = glazingOptions[i].glazingPrice;
        }
        if (item.size == packOptions[i].type){
            sizePrice = packOptions[i].packPrice;
        }
    }
    updatedPrice = (item.basePrice + glazePrice) * sizePrice;
    return updatedPrice;
}

function createItem(item){
    const template = document.querySelector("#item-template");
    const clone = template.content.cloneNode(true);
    item.element = clone.querySelector(".item");

    const btnDelete = item.element.querySelector('.cartRemove');
    btnDelete.addEventListener('click', () => {
        deleteItem(item);
        const cartPrice = document.getElementById("totalprice");
        if (cart.length == 0) {
            cartPrice.innerText = '$0.00';
        } 
        else {
        cartPrice.innerText = '$' + finalPrice.toFixed(2);
        }
});

const cartItem = document.querySelector(".flex-container");
cartItem.prepend(item.element);
updateItem(item);

const cartPrice = document.getElementById("totalprice");
cartPrice.innerText = "$" + finalPrice.toFixed(2);
}

function updateItem (item){
    const itemImageElement = item.element.querySelector(".itemimg");
    const itemTypeElement = item.element.querySelector(".roll-type");
    const itemGlazeElement = item.element.querySelector(".glazing");
    const itemSizeElement = item.element.querySelector(".pack-size");
    const itemPriceElement = item.element.querySelector(".price");

    itemImageElement.src = rolls[item.type].imageFile;
    itemTypeElement.innerText = item.type + " Cinnamon Roll";
    itemGlazeElement.innerText = "Glazing: " + item.glazing;
    itemSizeElement.innerText = "Pack Size: " + item.size;
    updatedPrice = findPrice(item);
    finalPrice = updatedPrice + finalPrice;
    itemPriceElement.innerText = "$" + updatedPrice.toFixed(2);

}

function deleteItem(item) {
    item.element.remove();
    cart.delete(item);
    itemPrice = findPrice(item);
    finalPrice = finalPrice - itemPrice;
    const cartArray = Array.from(cart);
    const cartArrayString = JSON.stringify(cartArray);
    localStorage.setItem("storedRolls", cartArrayString);
    console.log(localStorage.getItem("storedRolls"));
}

function retrieveLocalStorage() {
    const parsedRolls = JSON.parse(localStorage.getItem("storedRolls"));
    for (const rollData of parsedRolls) {
        const cartItem = addNewItem(rollData.type, rollData.glazing, rollData.size, rollData.basePrice);
        createItem(cartItem);
    }    

}

if (localStorage.getItem("storedRolls") != null) {
    retrieveLocalStorage();
}

console.log(localStorage.getItem("storedRolls"));