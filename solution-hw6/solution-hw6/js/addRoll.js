class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

function priceChange() {
    newPrice = (rolls[rollType].basePrice + glazingOptions[glazeDropMenu.selectedIndex].glazingPrice) * packOptions[packDropMenu.selectedIndex].packPrice;
    price.innerHTML = "$" + newPrice.toFixed(2).toString();
}

const headerElement = document.querySelector(".sloganInfo");
headerElement.innerText = rollType + " Cinnamon Roll";

const rollPrice = document.getElementById('price');

const rollImg = rolls[rollType]['imageFile'];
const imgElement = document.querySelector(".detailImg");
imgElement.src = rollImg;

document.querySelector("#cartbutton").addEventListener("click", addToCart);

price.innerHTML = "$" + rolls[rollType].basePrice.toFixed(2).toString();

var glazeDropMenu = document.getElementById("glazing-menu");
for (let i = 0; i < glazingOptions.length; i++) {
    let selection = document.createElement("option");
    selection.innerHTML = glazingOptions[i].type;
    selection.value = glazingOptions[i].glazingPrice.toString();
    glazeDropMenu.add(selection);
}

var packDropMenu = document.getElementById("pack-size");
for (let i = 0; i < packOptions.length; i++) {
    let selection = document.createElement("option");
    selection.innerHTML = packOptions[i].type;
    selection.value = packOptions[i].packPrice.toString();
    packDropMenu.add(selection);
}

const cart = [];

if (localStorage.getItem("storedRolls") != null) {
    const parsedRolls = JSON.parse(localStorage.getItem("storedRolls"));
    for (i in parsedRolls) {
        const selectRoll = parsedRolls[i];
        cart.push(selectRoll);
    }
}

function addToCart() {
    const newRoll = new Roll(rollType, glazingOptions[glazeDropMenu.selectedIndex].type, packOptions[packDropMenu.selectedIndex].type, rolls[rollType].basePrice);
    cart.push(newRoll);
    const cartArrayString = JSON.stringify(cart);
    localStorage.setItem("storedRolls", cartArrayString)
    console.log(localStorage.getItem("storedRolls"));
}
