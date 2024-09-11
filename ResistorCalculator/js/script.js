const line_1 = document.getElementById("line_1");
const line_2 = document.getElementById("line_2");
const line_3 = document.getElementById("line_3");
const line_4 = document.getElementById("line_4");
const calculate_btn = document.getElementById("calculate");
const calculate_color_btn = document.getElementById("calculate_colors");
const form = document.querySelector("form");

var precisionTab = {
    brown: 1,
    red: 2,
    green: 0.5,
    blue: 0.25,
    purple: 0.1,
    grey: 0.05,
    gold: 5,
    silver: 10
};

var resistanceTab = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    purple: 7,
    grey: 8,
    white: 9,
    gold: -1,
    silver: -2
}

let current = 1;


window.addEventListener("load", (event) => {
    initialView();
    addEvents();
});

function initialView() {
    document.getElementById("gold").classList.add("hidden")
    document.getElementById("silver").classList.add("hidden")
}

function addEvents() {
    document.getElementById("home_btn").addEventListener("click", () => {
        window.location.href = "../";
    });

    line_1.addEventListener("click", updateCurrent)
    line_2.addEventListener("click", updateCurrent)
    line_3.addEventListener("click", updateCurrent)
    line_4.addEventListener("click", updateCurrent)
    calculate_btn.addEventListener("click", calculate);
    calculate_color_btn.addEventListener("click", calculateColors);

    document.getElementById("none").addEventListener("click", updateValue);
    document.getElementById("black").addEventListener("click", updateValue);
    document.getElementById("brown").addEventListener("click", updateValue);
    document.getElementById("red").addEventListener("click", updateValue);
    document.getElementById("orange").addEventListener("click", updateValue);
    document.getElementById("yellow").addEventListener("click", updateValue);
    document.getElementById("green").addEventListener("click", updateValue);
    document.getElementById("blue").addEventListener("click", updateValue);
    document.getElementById("purple").addEventListener("click", updateValue);
    document.getElementById("grey").addEventListener("click", updateValue);
    document.getElementById("white").addEventListener("click", updateValue);
    document.getElementById("gold").addEventListener("click", updateValue);
    document.getElementById("silver").addEventListener("click", updateValue);

}

/**
 * 
 * @param {*} current 
 */
function updateCurrent(event) {

    current = event.target.value[event.target.value.length - 1]
    updateColor()
}

function updateValue(event) {
    console.log(event.target.id)
    if (current == 4) {
        value = precisionTab[event.target.id]
        document.getElementById("Selection_" + current).innerText = value
        current = 1
    } else {
        value = resistanceTab[event.target.id]
        document.getElementById("Selection_" + current).innerText = value
        current = parseInt(current) + 1
    }
    updateColor()

}

function updateColor() {
    if (current == 5) {
        document.getElementById("none").classList.add("hidden")
        document.getElementById("black").classList.add("hidden")
        document.getElementById("orange").classList.add("hidden")
        document.getElementById("yellow").classList.add("hidden")
        document.getElementById("white").classList.add("hidden")
        document.getElementById("gold").classList.remove("hidden")
        document.getElementById("silver").classList.remove("hidden")
    } else if (current == 4) {
        document.getElementById("none").classList.add("hidden")
        document.getElementById("black").classList.remove("hidden")
        document.getElementById("orange").classList.remove("hidden")
        document.getElementById("yellow").classList.remove("hidden")
        document.getElementById("white").classList.remove("hidden")
        document.getElementById("gold").classList.remove("hidden")
        document.getElementById("silver").classList.remove("hidden")
    } else if (current == 1) {
        document.getElementById("none").classList.remove("hidden")
        document.getElementById("black").classList.remove("hidden")
        document.getElementById("orange").classList.remove("hidden")
        document.getElementById("yellow").classList.remove("hidden")
        document.getElementById("white").classList.remove("hidden")
        document.getElementById("gold").classList.add("hidden")
        document.getElementById("silver").classList.add("hidden")
    } else {
        document.getElementById("none").classList.add("hidden")
        document.getElementById("black").classList.remove("hidden")
        document.getElementById("orange").classList.remove("hidden")
        document.getElementById("yellow").classList.remove("hidden")
        document.getElementById("white").classList.remove("hidden")
        document.getElementById("gold").classList.add("hidden")
        document.getElementById("silver").classList.add("hidden")
    }
}

function calculate() {
    total = (Selection_1.innerText + Selection_2.innerText) * (10 ** Selection_3.innerText)
    total = Math.round((total) * 100000) / 100000
    document.getElementById("Value").innerText = total + " Ω à +/- " + Math.round(((total / 100) * Selection_4.innerText) * 100000) / 100000 + " Ω"

}

function calculateColors() {
    let val = form.elements.resistance.value
    let zero = 0
    let i = val.length - 1
    while (val[i] == 0) {
        zero += 1
        i -= 1
    }

    val = (val / (10 ** zero)) + ""

    while (val.length > 2) {
        zero += 1
        val = (val - val[val.length - 1]) / 10
    }
    document.getElementById("color_3").innerText = form.elements.precision.value;
    document.getElementById("color_2").innerText = zero

    for (let y = 1; y <= val.length; y++) {
        document.getElementById("color_" + (val.length - y)).innerText = val[val.length - y]
    }
}