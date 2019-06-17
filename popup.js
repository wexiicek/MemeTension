var version_button = document.getElementById("version");
var target = document.getElementById("img_target");
var reset_btn = document.getElementById("reset_btn");
var filter_input = document.getElementById("filter_input");
var dark_mode_btn = document.getElementById("dark_mode");

//Function that loads images.json from the storage
//Don't even ask, it's JS magicfuckery..
//Provided by @Stano at https://stackoverflow.com/a/34579496
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

//Function that loads all images located in json (and the storage)
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

//Function checks if the user query matches
//the tags of the given image
function filter_fits(data) {
    var query = filter_input.value;

    for (var i = 0; i < data.length; i++) {
        if (data[i].startsWith(query.toLowerCase())) {
            return true;
        }
    }

    return false;
}

//Function displays images according to the user query
function searching() {
    target.innerHTML = ""; //Resetting the content of the div

    filter_input = document.getElementById("filter_input");

    //If the search bar is empty, return all images
    if (filter_input.value == "" ||
        filter_input.value == null) {
        loadAll();
        return;
    }

    //If the search bar is not empty
    readTextFile("images.json", function (text) {
        var data = JSON.parse(text);
        var i = 0;
        for (item in data.images) {
            if (filter_fits(Object.values(data.images)[i].tags)) {
                var img = document.createElement("img");
                img.src = "./img/" + Object.values(data.images)[i].name + ".png";
                target.appendChild(img);
            }
            i++;
        }

    });
}

//If user starts typing in the filter field,
//perform a search
filter_input.addEventListener("input", function () {
    searching();
});

//If the user wishes to remove the filter
reset_btn.addEventListener("click", function () {
    filter_input.value = ""; //Remove the filter query
    target.innerHTML = ""; //Resetting the content of target
    loadAll(); //Load all images
})

//Loading all images on document load
document.addEventListener("load", loadAll());

//If user starts typing without selecting
//the field, select the field for him
document.addEventListener("keypress", function (e) {
    if (filter_input.value == "") {
        filter_input.select();
    }
})

//Show an alert with version updates
version_button.addEventListener("click", function () {
    alert(
        "Version 1.1.3\n" +
        "Added Dark Mode.\n\n" +
        "Version 1.1.2\n" +
        "Revamped filtering once again.\n" +
        "  Filtering now supports dynamic results, user does not need to input a whole name of image\n\n" +
        "Version 1.1.1\n" +
        "Revamped filtering. Removed buttons, filtering is dynamic.\n\n" +
        "Version 1.1.0\n" +
        "Added filter functionality\n    • You can now filter your memes!\n\n" +
        "Version 1.0.1\n" +
        "Edited markup.\nConverted the app into CSS grid.\n"
    );
})

//Function changes document's body background
//And changes button icons (white & black)
dark_mode_btn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    var bulb_dark = document.getElementById("bulb_d");
    var bulb_light = document.getElementById("bulb_l");
    var eraser_dark = document.getElementById("eraser_d");
    var eraser_light = document.getElementById("eraser_l");
    if (document.body.classList.contains("dark")) {
        bulb_dark.style.display = "none";
        bulb_light.style.display = "block";
        eraser_dark.style.display = "none";
        eraser_light.style.display = "inline-block";
    } else {
        bulb_dark.style.display = "block";
        bulb_light.style.display = "none";
        eraser_dark.style.display = "inline-block";
        eraser_light.style.display = "none";
    }
})