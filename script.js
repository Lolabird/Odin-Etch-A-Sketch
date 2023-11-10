
const container = document.querySelector(".container");
const conWidth = container.clientWidth;
const grid = document.createElement("div");
const gridSlider = document.querySelector("#gridSlider");
let numGrid = gridSlider.value;
let sliderLabel = document.querySelector("#sliderLabel");


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
    this.style.background = "blue";
}

createGrid();