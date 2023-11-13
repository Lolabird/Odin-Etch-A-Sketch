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
const transLabel = document.querySelector("#trans-label");
const transSlider = document.querySelector("#canvas-trans");
const rangeSlider = document.querySelector('input[type="range"]');
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

transSlider.addEventListener("input", adjustTransparency);
rangeSlider.addEventListener('input', changeSliderColor);

gridSlider.addEventListener("input", getGridDimensions);

rangeKnob.addEventListener("pointerdown", (e) => {
    document.addEventListener("pointermove", rotateKnob);
    document.addEventListener("pointerup", () => {
        document.removeEventListener("pointermove", rotateKnob);
    });
});
rangeKnob.addEventListener("touchstart", (e) => {
    e.preventDefault();
    document.addEventListener("touchmove", rotateKnob);
    document.addEventListener("touchend", () => {
        document.removeEventListener("touchmove", rotateKnob);
    });
});


reset.addEventListener("click", resetGrid);


function resetGrid() {
    gridSlider.value = gridSlider.defaultValue;
    container.style.backgroundColor = "rgb(180, 254, 235)";
    backColorPicker.value = "#b4feeb";
    colorPicker.value = "#000000";
    colorValue = "black";
    rangeKnob.style.transform = `rotate(101.309deg)`;
    transSlider.value = 1;
    transSlider.style.backgroundColor = "rgb(180, 254, 235)";
    rangeSlider.style.setProperty('--canvas-color', "rgb(180, 254, 235)");
    rangeSlider.style.setProperty('--range-value', `100%`);
    transLabel.textContent = transSlider.value

    getGridDimensions();
}


function rotateKnob(e) {
    const knobBounds = rangeKnob.getBoundingClientRect();
    const knobCenter = {
        x: knobBounds.left + knobBounds.width / 2,
        y: knobBounds.top + knobBounds.height / 2
    };
    let angle //= Math.atan2(e.clientX - knobCenter.x, -(e.clientY - knobCenter.y)) * (180 / Math.PI);

    if (e.clientX) {
        // Pointer/mouse event
        angle = Math.atan2(e.clientX - knobCenter.x, -(e.clientY - knobCenter.y)) * (180 / Math.PI);
    } else if (e.touches[0].clientX) {
        // Touch event
        angle = Math.atan2(e.touches[0].clientX - knobCenter.x, -(e.touches[0].clientY - knobCenter.y)) * (180 / Math.PI);
    }
    
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
        item.addEventListener("touchstart", colorGrid);
        item.addEventListener("pointerover", colorGrid);
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


function changeSliderColor() {
    const percentage = ((rangeSlider.value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min)) * 100;
    rangeSlider.style.setProperty('--range-value', `${percentage}%`);
}


function pickBackground() {
    const currentColor = container.style.backgroundColor;
    let num = currentColor.match(/\d+/g);
    let num2 = convertHexToRGB(backColorPicker.value);
    let r;
    let g;
    let b;
    let a;

    if (currentColor.includes("rgba")) {
        console.log(num2);
        console.log(num)
        r = num2[0];
        g = num2[1];
        b = num2[2];
        a = num[3]+ "."+ num[4];
        container.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
        transSlider.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
        rangeSlider.style.setProperty('--canvas-color', `rgba(${r},${g},${b},${a})`);
    } else {
        container.style.backgroundColor = backColorPicker.value;
        transSlider.style.backgroundColor = backColorPicker.value;
        rangeSlider.style.setProperty('--canvas-color', backColorPicker.value);
    }
}


function convertHexToRGB(val) {
    hex = val.replace(/^#/, '');

    // Parse the hex value
    const bigint = parseInt(hex, 16);

    // Extract RGB components
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return ([r, g, b]);
}


function adjustTransparency() {
    const currentColor = container.style.backgroundColor;
    let num = currentColor.match(/\d+/g);
    let r;
    let g;
    let b;
    let a;

    r = +num[0];
    g = +num[1];
    b = +num[2];
    a = transSlider.value;

    transLabel.textContent = a;
    container.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
    transSlider.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
    rangeSlider.style.setProperty('--canvas-color', `rgba(${r},${g},${b},${a})`);
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
    
    colorPicker.classList.remove ("is-active");

    buttons.forEach(btn => btn.classList.remove("is-active"));
    this.classList.add("is-active");

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
    if (!value) {
        value = container.style.backgroundColor
    }

    let num = value.match(/\d+/g);

    let r = +num[0] + (0.25 * (255 - +num[0]));
    let g = +num[1] + (0.25 * (255 - +num[1]));
    let b = +num[2] + (0.25 * (255 - +num[2]));

    return`rgb(${r},${g},${b})`;
}


function shadeColor(value) {
    if (!value) {
        value = container.style.backgroundColor
    }
    
    let num = value.match(/\d+/g);
    let r = +num[0] * .75;
    let g = +num[1] * .75;
    let b = +num[2] * .75;

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