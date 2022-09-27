let glazingOption = [
    {
        type: "Original",
        glazingPrice: 0
    }, 
    {
        type: "Sugar Milk",
        glazingPrice: 0
    },
    {
        type: "Vanilla Milk",
        glazingPrice: 0.50
    },
    {
        type: "Double Chocolate",
        glazingPrice: 1.50
    }
    ]

let packOption = [
    {
        size: "1",
        packPrice: 1
    },
    {
        size: "3",
        packPrice: 3
    },
    {
        size: "6",
        packPrice: 5
    },
    {
        size: "12",
        packPrice: 10
    }
]


let glazeSelectElement = document.querySelector('#glazing-menu');
let packSelectElement = document.querySelector('#pack-size');
let newPrice = 0.00
let finalPrice = 0.00

for (let i = 0; i < 4; i +=1) {
    let option = document.createElement('option');
    option.text = glazingOption[i].type;
    option.value = glazingOption[i].glazingPrice;
    glazeSelectElement.add(option);
}

for (let i = 0; i < 4; i +=1) {
    let option = document.createElement('option');
    option.text = packOption[i].size;
    option.value = packOption[i].packPrice;
    packSelectElement.add(option);
}

function glazingChange(element) {
    const glazePriceChange = Number(element.value);
    newPrice = (Number(2.49 + glazePriceChange)).toFixed(2);
    finalPrice = "$" + newPrice;
    displayPrice(finalPrice)
}

function packChange(element){
    const packPriceChange = Number(element.value);
    let updatedPrice = (Number(newPrice * packPriceChange)).toFixed(2);
    finalPrice = "$" + updatedPrice;
    displayPrice(finalPrice)
}
  
function displayPrice(finalPrice){
    let price = document.querySelector('.price');
    price.innerText = finalPrice;
}


