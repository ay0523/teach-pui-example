class Card {
    constructor(word, img, num) {
        this.word = word;
        this.img = img
        this.num = num
    }
}

class Match {
    constructor(eng, chi, num) {
        this.eng = eng
        this.chi = chi
        this.num = num
    }
}

// get the game mode
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const gameMode = params.get('game');

let cardData = {
   "numbers": [
       ["One", "e.numbers/one.png", "Yi", "c.numbers/yi.png"],
       ["Ten", "e.numbers/ten.png", "Shi", "c.numbers/shi.png"],
       ["Hundred", "e.numbers/hundred.png", "Bai", "c.numbers/bai.png"],
       ["Thousand", "e.numbers/thousand.png", "Qian", "c.numbers/qian.png"],
       ["Ten Thousand", "e.numbers/tenthousand.png","Wan", "c.numbers/wan.png"],
    ], 

    "colors": [
        ["Orange","e.colors/orange.png", "Cheng", "c.colors/cheng.png"],
        ["Red","e.colors/red.png", "Hong", "c.colors/hong.png"],
        ["Yellow","e.colors/yellow.png", "Huang", "c.colors/huang.png"],
        ["Blue","e.colors/blue.png", "Lan", "c.colors/lan.png"],
        ["Green","e.colors/green.png", "Lu", "c.colors/lu.png"]
    ],

    "animals": [
        ["Dog","e.animals/dog.png", "Gou", "c.animals/gou.png"],
        ["Horse","e.animals/horse.png", "Ma", "c.animals/ma.png"],
        ["Cat","e.animals/cat.png", "Mao", "c.animals/mao.png"],
        ["Cow","e.animals/cow.png", "Nui", "c.animals/nui.png"],
        ["Rabbit","e.animals/rabbit.png", "Tu", "c.animals/tu.png"]

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
        gameData["numbers"]["eng"].push(new Card(currSet[i][0], currSet[i][1], i))
        gameData["numbers"]["chi"].push(new Card(currSet[i][2], currSet[i][3], i))
    }

    // colors set
    currSet = cardData["colors"]
    for (let i = 0; i < currSet.length; i++) {
        gameData["colors"]["eng"].push(new Card(currSet[i][0], currSet[i][1], i))
        gameData["colors"]["chi"].push(new Card(currSet[i][2], currSet[i][3], i))
    }

    // animals set
    currSet = cardData["animals"]
    for (let i = 0; i < currSet.length; i++) {
        gameData["animals"]["eng"].push(new Card(currSet[i][0], currSet[i][1], i))
        gameData["animals"]["chi"].push(new Card(currSet[i][2], currSet[i][3], i))
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
        console.log("WRONG")
        displayTryAgain("TRY AGAIN")

        setTimeout(() => { 
            removeTryAgain()
        }, 1000);
        score -= 1
    } else {
        console.log("CORRECt")

        let engDiv = eng.next()
        engDiv.css('box-shadow', ' 0 0 5px 5px #588D58')

        let chiDiv = chi.next()
        chiDiv.css('box-shadow', ' 0 0 5px 5px #588D58')

        setTimeout(() => { 
            chiDiv.hide() 
            engDiv.hide()
            console.log("hello")
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

