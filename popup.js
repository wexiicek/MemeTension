var filter_btn = document.getElementById("filter_btn");
var filter_input = document.getElementById("filter_input");
var filter_reset_btn = document.getElementById("filter_reset_btn");
var version_button = document.getElementById("version");
var target = document.getElementById("img_target");

//Function that loads images.json from the storage
//Don't even ask, it's JS magicfuckery..
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//Function that loads all images in the storage
//into the HTML code
function loadAll() {
    readTextFile("images.json", function (text) {
        var data = JSON.parse(text);
        var i = 0;
        for (item in data.images) {
            var img = document.createElement("img");
            img.src = "./img/" + Object.values(data.images)[i++].name + ".png";
            target.appendChild(img);
        }
    });
}



//Loading all images on document load
document.addEventListener("load", loadAll());

//Loading all images after the reset button is pressed
filter_reset_btn.addEventListener("click", function () {
    target.innerHTML = '';
    loadAll();
});

version_button.addEventListener("click", function () {
    alert(
        "Version 1.1.0\n" +
        "Added filter functionality\nYou can now filter your memes!\n\n" +
        "Version 1.0.1\n" +
        "Edited markup.\nConverted the app into CSS grid.\n"
    );
})

//Loading selected images after filter button is pressed
filter_btn.addEventListener("click", function () {
    target.innerHTML = ''; //Resetting the content of the div

    //If the search bar is empty, return all images
    if (filter_input.value == '' ||
        filter_input.value == null) {
        loadAll();
        return;
    }

    //If the search bar is not empty
    readTextFile("images.json", function (text) {
        var data = JSON.parse(text);
        var i = 0;
        for (item in data.images) {
            if (Object.values(data.images)[i].tags.indexOf(String(filter_input.value).toLowerCase()) > -1) {
                var img = document.createElement("img");
                img.src = "./img/" + Object.values(data.images)[i].name + ".png";
                target.appendChild(img);
            }
            i++;
        }

    });

    filter_input.value = ''; //Resetting the serach bar
})