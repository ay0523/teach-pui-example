// create card
class Card {
    constructor(word, img, num, alt) {
        this.word = word;
        this.img = img;
        this.num = num;
        this.alt = alt;
    }
}

// get the game mode
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const gameMode = params.get('game');

let cardData = {
   "numbers": [
       ["One", "e.numbers/one.png", "roman numeral one", "Yi", "c.numbers/yi.png", "chinese character one"],
       ["Ten", "e.numbers/ten.png", "roman numeral ten", "Shi", "c.numbers/shi.png", "chinese character ten"],
       ["Hundred", "e.numbers/hundred.png", "roman numeral one hundred", "Bai", "c.numbers/bai.png", "chinese character hundred"],
       ["Thousand", "e.numbers/thousand.png", "roman numeral one thousand","Qian", "c.numbers/qian.png", "chinese character thousand"],
       ["Ten Thousand", "e.numbers/tenthousand.png","roman numeral ten thousand","Wan", "c.numbers/wan.png", "chinese character ten thousand"],
    ], 

    "colors": [
        ["Orange","e.colors/orange.png", "orange square", "Cheng", "c.colors/cheng.png", "chinese character orange"],
        ["Red","e.colors/red.png", "red square", "Hong", "c.colors/hong.png", "chinese character red"],
        ["Yellow","e.colors/yellow.png", "yellow square", "Huang", "c.colors/huang.png", "chinese character yellow"],
        ["Blue","e.colors/blue.png", "blue square", "Lan", "c.colors/lan.png", "chinese character blue"],
        ["Green","e.colors/green.png", "green square", "Lu", "c.colors/lu.png", "chinese character green"]
    ],

    "animals": [
        ["Dog","e.animals/dog.png", "cartoon brown dog with red collar", "Gou", "c.animals/gou.png", "chinese character dog"],
        ["Horse","e.animals/horse.png", "cartoon brown horse on back two legs", "Ma", "c.animals/ma.png", "chinese character horse"],
        ["Cat","e.animals/cat.png", "cartoon yellow cat sitting", "Mao", "c.animals/mao.png", "chinese character cat"],
        ["Cow","e.animals/cow.png", "cartoon cow with yellow bell around neck", "Nui", "c.animals/nui.png", "chinese character cow"],
        ["Rabbit","e.animals/rabbit.png", "cartoon grey rabbit", "Tu", "c.animals/tu.png", "chinese character rabbit"]

    ]

}


let gameData = {
    "numbers": {
        "eng": [],
        "chi": []
    },

    "colors": {
        "eng": [],
        "chi": []
    },

    "animals": {
        "eng": [],
        "chi": []
    }
}


function createSets () {
    // numbers set
    let currSet = cardData["numbers"]
    for (let i = 0; i < currSet.length; i++) {
        gameData["numbers"]["eng"].push(new Card(currSet[i][0], currSet[i][1], i, currSet[i][2]))
        gameData["numbers"]["chi"].push(new Card(currSet[i][3], currSet[i][4], i, currSet[i][5]))
    }

    // colors set
    currSet = cardData["colors"]
    for (let i = 0; i < currSet.length; i++) {
        gameData["colors"]["eng"].push(new Card(currSet[i][0], currSet[i][1], i, currSet[i][2]))
        gameData["colors"]["chi"].push(new Card(currSet[i][3], currSet[i][4], i, currSet[i][5]))
    }

    // animals set
    currSet = cardData["animals"]
    for (let i = 0; i < currSet.length; i++) {
        gameData["animals"]["eng"].push(new Card(currSet[i][0], currSet[i][1], i, currSet[i][2]))
        gameData["animals"]["chi"].push(new Card(currSet[i][3], currSet[i][4], i, currSet[i][5]))
    }
    
}

// put the correct info into the game
function populateCards () {
    let set = gameData[gameMode]
    $(`.gameName`).text(gameMode.charAt(0).toUpperCase() + gameMode.slice(1))

    let chiCards = set["chi"]
    let picked = new Set()
    let htmlIndex = 0

    while (picked.size < 5) {
        let i = Math.floor(Math.random() * chiCards.length)

        if (picked.has(i)) {
            continue
        }
           
        let card = chiCards[i]
        $(`.c-card${htmlIndex}`).val(card.num)
        $(`.c-card${htmlIndex}Name`).text(card.word)
        $(`.c-card${htmlIndex}Img`).attr("src", card.img)
        $(`.c-card${htmlIndex}Img`).attr("alt", card.alt)
        htmlIndex += 1
        picked.add(i)
    }

    let engCards = set["eng"]
    picked = new Set()
    htmlIndex = 0

    while (picked.size < 5) {
        let i = Math.floor(Math.random() * engCards.length)

        if (picked.has(i)) {
            continue
        }
        
        let card = engCards[i]
        $(`.e-card${htmlIndex}`).val(card.num)
        $(`.e-card${htmlIndex}Name`).text(card.word)
        $(`.e-card${htmlIndex}Img`).attr("src", card.img)
        $(`.e-card${htmlIndex}Img`).attr("alt", card.alt)
        htmlIndex += 1
        picked.add(i)
    }

}

createSets()

//create stopwatch

let game = true
let seconds = 00;
if (game){
    var x = setInterval(() => {
        seconds += 1
        $("#seconds").text(seconds)
    }, 1000);
}

//get clicked buttons

$('input[name="c-radio"]').click(function() {
    if($('input[name="e-radio"]:checked').val() == null) {
        return
    }

    checkSelected()
});

$('input[name="e-radio"]').click(function() {
    if($('input[name="c-radio"]:checked').val() == null) {
        return
    }

    checkSelected()
  });


let score = 0
let correct = 0

//check clicked buttons for match

function checkSelected () {
    let eng = $('input[name="e-radio"]:checked')
    let chi = $('input[name="c-radio"]:checked')

    if (eng.val() == null || chi.val() == null) {
        return
    }
    
    if (eng.val() != chi.val()) {
        displayTryAgain("TRY AGAIN")

        setTimeout(() => { 
            removeTryAgain()
        }, 1000);
        score -= 1
    } else {
        let engDiv = eng.next()
        engDiv.css('box-shadow', ' 0 0 5px 5px #588D58')

        let chiDiv = chi.next()
        chiDiv.css('box-shadow', ' 0 0 5px 5px #588D58')

        setTimeout(() => { 
            chiDiv.hide() 
            engDiv.hide()
        }, 1000);

        score += 1
        correct += 1
    }

    $("#score").text(score)
    $("input:radio").removeAttr("checked");

    if (correct == 5) {
        game == false
        setTimeout(() => {
            displayGameOver()
          }, 1000)
    }
}

//if user gets an incorrect match

function displayTryAgain(text) {
    $("<table id='overlay'><tbody><tr><td>" + text + "</td></tr></tbody></table>").css({
        "position": "fixed",
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "100%",
        "background-color": "rgba(255,89,89,.5)",
        "z-index": 10000,
        "vertical-align": "middle",
        "text-align": "center",
        "color": "#fff",
        "font-size": "60px",
        "font-weight": "bold",
        "cursor": "not-allowed"
    }).appendTo("body");
}

function removeTryAgain() {
    $("#overlay").remove();
}

//once game is over

function displayGameOver() {
    $("#countdown").addClass("hidden");
    $(".gameInfo").addClass("hidden");
    $("#gameOverOverlay").addClass("visible");
    $(".gameStats").text("You scored " + score + " point in " + seconds + " seconds");
}

