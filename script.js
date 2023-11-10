let numGrid = 16; //will use this later to prompt user
//need to figure out the wrapping issue
const container = document.querySelector(".container");
const conWidth = container.clientWidth;
const conHeight = container.clientHeight
const grid = document.createElement("div");

function createGrid() {
    const gridArea = numGrid ** 2;
    const gridWidth = conWidth / numGrid;
    const gridHeight = conHeight / numGrid;

    grid.classList.add("grid");
    grid.style.width = gridWidth + 'px';
    grid.style.height = gridHeight + 'px';

    for (let i = 0; i < gridArea; i++){
        container.appendChild(grid.cloneNode(true));
    }

    const gridItems = document.querySelectorAll(".grid");

    gridItems.forEach((item) => {
        item.addEventListener("mouseover", colorGrid);
    });

}

function colorGrid() {
    this.style.background = "blue";
}


createGrid();


