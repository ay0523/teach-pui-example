
//instructions pop up
var closePopup = document.getElementById("popupclose");
var overlay = document.getElementById("overlay");
var popup = document.getElementById("popup");
closePopup.onclick = function() {
    overlay.style.display = 'none';
    popup.style.display = 'none';
};

helpButton.onclick = function() {
    overlay.style.display = 'block';
    popup.style.display = 'block';
};


