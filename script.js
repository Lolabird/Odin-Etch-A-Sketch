const container = document.querySelector(".container");
const conWidth = container.clientWidth;
const grid = document.createElement("div");
const gridSlider = document.querySelector("#gridSlider");
const buttons = document.querySelectorAll(".pen");
const colorPicker = document.querySelector("#custom-color");
const reset = document.querySelector("#reset");
const backColorPicker = document.querySelector("#back-col-picker")
let colorValue;
let numGrid; //= gridSlider.value;
let sliderLabel = document.querySelector("#sliderLabel");


//the next few variables are set to be used to test if 
//a given button has been clicked
let isRgb;
let isTint;
let isShade;    
let isOpaque;
let isTrans;
let isBlack;
let isWhite;
let isErase;


getGridDimensions();

buttons.forEach((button) => {
    button.addEventListener ("click", changeColor);
});

colorPicker.addEventListener("input", changeColor);
backColorPicker.addEventListener("input", pickBackground);
reset.addEventListener("click", getGridDimensions);


function pickBackground() {
    container.style.backgroundColor = backColorPicker.value;
}


function createGrid() {
    numGrid = gridSlider.value;
    const gridArea = numGrid ** 2;
    const gridWidth = 100 / numGrid;

    sliderLabel.textContent = numGrid;

    grid.classList.add("grid");
    grid.style.width = gridWidth + '%';
    grid.style.height = gridWidth + '%';
    grid.style.opacity = 0.9;

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
    container.style.backgroundColor = "#ffffff";
    backColorPicker.value = "#ffffff";
    colorPicker.value = "#000000";
    colorValue = "black";
    gridSlider.defaultValue = 16;
    numGrid = gridSlider.defaultValue;
    
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    createGrid();
}


function colorGrid() {
    if (isRgb) {
        this.style.backgroundColor = randomizeColor();
    } else if (isTint) {
        this.style.backgroundColor = tintColor(this.style.backgroundColor);
    } else if (isShade) {
        this.style.backgroundColor = shadeColor(this.style.backgroundColor);
    } else if (isOpaque){
        this.style.opacity = makeOpaque(this.style.opacity);
    } else if (isTrans) {
        this.style.opacity = makeTransparent(this.style.opacity);
    } else if (isBlack) {
        this.style.backgroundColor = "rgb(0, 0, 0)";
    } else if (isWhite) {
        this.style.backgroundColor = "rgb(255, 255, 255)";
    } else if (isErase) {
        this.style.backgroundColor = "";
    } else {
        this.style.backgroundColor = colorPicker.value;
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

    if (buttonID === "opacity") {
        isOpaque = true;
    } else {
        isOpaque = false
    }

    if (buttonID === "trans") {
        isTrans = true;
    } else {
        isTrans = false
    }

    if (buttonID === "whiteColor") {
        isWhite = true;
    } else {
        isWhite = false
    }

    if (buttonID === "blackColor") {
        isBlack = true;
    } else {
        isBlack = false
    }

    if (buttonID === "erase") {
        isErase = true;
    } else {
        isErase = false
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
    r = +num[0] + (0.25 * (255 - +num[0]));
    g = +num[1] + (0.25 * (255 - +num[1]));
    b = +num[2] + (0.25 * (255 - +num[2]));

    return`rgb(${r},${g},${b})`;
}


function shadeColor(value) {
    let num = value.match(/\d+/g);
    r = +num[0] * .75;
    g = +num[1] * .75;
    b = +num[2] * .75;

    return`rgb(${r},${g},${b})`;
}


function makeOpaque(value) {
    let num = +value;

    if (num < 1){
        num += .1
    }

    return num;
}


function makeTransparent(value) {
    let num = +value;

    if (num > 0){
        num -= .1
    }
    
    return num;
}