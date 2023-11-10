
const container = document.querySelector(".container");
const conWidth = container.clientWidth;
const grid = document.createElement("div");
const gridSlider = document.querySelector("#gridSlider");
const buttons = document.querySelectorAll("button");
let colorValue = "black";
let numGrid = gridSlider.value;
let sliderLabel = document.querySelector("#sliderLabel");

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
    this.style.background = colorValue;
}

function changeColor() {
    const buttonID = this.id;

    switch (buttonID) {
        case "rgbColor":
            colorValue = rgbColor();
            break;
        case "whiteColor":
            colorValue = "white";
            break;
        case "shade":
            colorValue = "#333";
            break;
        case "tint":
            colorValue = "#eee";
            break;
        case "opacity":
            colorValue = "blue";
            break;
        case "erase": 
            colorValue = "transparent";
            break;
        default:
            colorValue = "black";
            break;
    }
}

function rgbColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    return `rgb(${r},${g},${b})`;

}

createGrid();