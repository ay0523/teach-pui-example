import {rolls} from "./rollsData.js"

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

const cart = []

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
const rollPrice = rolls[rollType].basePrice
const rollImg = rolls[rollType]['imageFile']

const headerElement = document.querySelector(".sloganInfo");
headerElement.innerText = rollType + " Cinnamon Roll"

const imgElement = document.querySelector(".detailImg");
imgElement.src = rollImg

document.querySelector("#cartbutton").addEventListener("click", addToCart);


function addToCart(){
    let glazingIndex = glazeSelectElement.selectedIndex;
    let glazingChoice = glazingOption[glazingIndex];

    let packIndex = packSelectElement.selectedIndex;
    let packChoice = packOption[packIndex];

    let newRoll = new Roll(rollType, glazingChoice.type, packChoice.size, rollPrice);
    
    cart.push(newRoll)
    
    console.log(cart);
}

