var version_button = document.getElementById("version");
var target = document.getElementById("img_target");
var reset_btn = document.getElementById("reset_btn");
var filter_input = document.getElementById("filter_input");

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

function filter_fits(data) {
    var query = filter_input.value;

    for (var i = 0; i < data.length; i++) {
        if (data[i].startsWith(query)) {
            return true;
        }
    }

    return false;
}

function searching() {
    target.innerHTML = ''; //Resetting the content of the div

    filter_input = document.getElementById("filter_input");

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
            if (filter_fits(Object.values(data.images)[i].tags)) {
                var img = document.createElement("img");
                img.src = "./img/" + Object.values(data.images)[i].name + ".png";
                target.appendChild(img);
            }
            i++;
        }

    });
}

filter_input.addEventListener("input", function () {
    searching();
});

reset_btn.addEventListener("click", function () {
    filter_input.value = "";
    searching();
})

//Loading all images on document load
document.addEventListener("load", loadAll());

document.addEventListener("keypress", function (e) {
    if (filter_input.value == '') {
        filter_input.select();
    }
})

version_button.addEventListener("click", function () {
    alert(
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