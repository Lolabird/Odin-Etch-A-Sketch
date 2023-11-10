
const container = document.querySelector(".container");
const conWidth = container.clientWidth;
const grid = document.createElement("div");
const gridSlider = document.querySelector("#gridSlider");
const buttons = document.querySelectorAll("button");
let colorValue = "black";
let numGrid = gridSlider.value;
let sliderLabel = document.querySelector("#sliderLabel");
//the next few variables test 
let isRgb;
let isTint;
let isShade;    

buttons.forEach((button) => {
    button.addEventListener ("click", changeColor);
});


function createGrid() {
    const gridArea = numGrid ** 2;
    const gridWidth = 100 / numGrid;

    sliderLabel.textContent = numGrid

    grid.classList.add("grid");
    grid.style.width = gridWidth + '%';
    grid.style.height = gridWidth + '%';

    for (let i = 0; i < gridArea; i++){
        container.appendChild(grid.cloneNode(true));
    }

    const gridItems = document.querySelectorAll(".grid");

    gridItems.forEach((item) => {
        item.addEventListener("mouseover", colorGrid);
    });

    gridSlider.addEventListener("input", getGridDimensions);
}


function getGridDimensions() {    
    numGrid = gridSlider.value;
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    createGrid();
}

function colorGrid() {
    if (isRgb) {
        this.style.background = randomizeColor();
    } else if (isTint) {
        this.style.background = tintColor(this.style.background);
    } else if (isShade) {
        this.style.background = shadeColor(this.style.background);
    } else {
        this.style.background = colorValue;
    }
}

function changeColor() {
    const buttonID = this.id;

    if (buttonID === "rgbColor") {
        isRgb = true;
    } else {
        isRgb = false;
    }

    if (buttonID === "tint") {
        isTint = true;
    } else {
        isTint = false
    }

    if (buttonID === "shade") {
        isShade = true;
    } else {
        isShade = false
    }

    switch (buttonID) {
        case "whiteColor":
            colorValue = "rgb(255, 255, 255)";
            break;
        case "opacity":
            colorValue = "blue";
            break;
        case "erase": 
            colorValue = "transparent";
            break;
        default:
            colorValue = "rgb(0, 0, 0)";
            break;
    }
}

function randomizeColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    return `rgb(${r},${g},${b})`;
}

function tintColor(value) {
    let num = value.match(/\d+/g);
    r = +num[0] + (0.25 * +num[0]);
    g = +num[1] + (0.25 * +num[1]);
    b = +num[2] + (0.25 * +num[2]);

    return`rgb(${r},${g},${b})`;
}

function shadeColor(value) {
    let num = value.match(/\d+/g);
    r = +num[0] * .75;
    g = +num[1] * .75;
    b = +num[2] * .75;

    return`rgb(${r},${g},${b})`;
}

createGrid();
//setGridListeners();