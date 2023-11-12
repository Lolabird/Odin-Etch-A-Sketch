const container = document.querySelector(".container");
const conWidth = container.clientWidth;
const grid = document.createElement("div");
const gridSlider = document.querySelector("#gridSlider");
gridSlider.defaultValue = 16;
const sliderLabel = document.querySelector("#sliderLabel");
const rangeKnob = document.querySelector("#range-knob");
let numGrid;
const buttons = document.querySelectorAll(".pen");
const colorPicker = document.querySelector("#custom-color");
let colorValue;
const backColorPicker = document.querySelector("#back-col-picker");
const reset = document.querySelector("#reset");


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


resetGrid();

buttons.forEach((button) => {
    button.addEventListener ("click", changeColor);
});

colorPicker.addEventListener("input", changeColor);
colorPicker.addEventListener("change", changeColor);
backColorPicker.addEventListener("input", pickBackground);
reset.addEventListener("click", resetGrid);

gridSlider.addEventListener("input", getGridDimensions);
gridSlider.addEventListener("change", getGridDimensions);
rangeKnob.addEventListener("mousedown", (e) => {
    document.addEventListener("mousemove", rotateKnob);
    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", rotateKnob);
    });
});


function resetGrid() {
    gridSlider.value = gridSlider.defaultValue;
    container.style.backgroundColor = "rgb(180, 254, 235)";
    backColorPicker.value = "#b4feeb";
    colorPicker.value = "#000000";
    colorValue = "black";
    rangeKnob.style.transform = `rotate(${gridSlider.value}deg)`;

    getGridDimensions();
}


function rotateKnob(e) {
    const knobBounds = rangeKnob.getBoundingClientRect();
    const knobCenter = {
        x: knobBounds.left + knobBounds.width / 2,
        y: knobBounds.top + knobBounds.height / 2
    };
    let angle = Math.atan2(e.clientX - knobCenter.x, -(e.clientY - knobCenter.y)) * (180 / Math.PI);

    rangeKnob.style.transform = `rotate(${angle}deg)`;

    updateGridSlider(angle);
}


function updateGridSlider(angle) {
    const maxRotation = 360;
    const minSliderVal = gridSlider.min;
    const maxSliderVal = gridSlider.max;

    const sliderVal = (angle + maxRotation) % maxRotation;
    const normalizedValue = (sliderVal / maxRotation) * (maxSliderVal - minSliderVal) + minSliderVal;

    gridSlider.value = normalizedValue;
    getGridDimensions(normalizedValue);
}


function getGridDimensions(val) {   
    //numGrid = gridSlider.value;
    numGrid = val;
    
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    
    createGrid();
}


function createGrid() {
    numGrid = gridSlider.value;
    const gridArea = numGrid ** 2;
    const gridWidth = 100 / numGrid;

    sliderLabel.textContent = numGrid;

    grid.classList.add("grid", "grid-on");
    grid.style.width = gridWidth + '%';
    grid.style.height = gridWidth + '%';
    grid.style.opacity = 0.9;

    for (let i = 0; i < gridArea; i++){
        container.appendChild(grid.cloneNode(true));
    }

    const gridItems = document.querySelectorAll(".grid");
    const gridToggle = document.querySelector("#gridToggle");

    gridItems.forEach((item) => {
        item.addEventListener("mouseover", colorGrid);
    });

    gridToggle.addEventListener("click", () => {
        gridItems.forEach((item) => {
            toggleGridView(item);
        });
    }); 
}


function toggleGridView(gridItem) {
    if (gridItem.classList.contains("grid-on")){
        gridItem.classList.remove("grid-on");
        gridItem.classList.add("grid-off");
    } else {
        gridItem.classList.remove("grid-off");
        gridItem.classList.add("grid-on");
    }
}


function pickBackground() {
    container.style.backgroundColor = backColorPicker.value;
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