const container = document.querySelector(".container");
const conWidth = container.clientWidth;
const conHeight = container.clientHeight
const grid = document.createElement("div");
let numGrid = 16;
const gridArea = numGrid ** 2;
const gridWidth = conWidth / numGrid;
const gridHeight = conHeight / numGrid;

grid.classList.add("grid");
grid.style.width = gridWidth + 'px';
grid.style.height = gridHeight + 'px';

for (let i = 0; i < gridArea; i++){
    container.appendChild(grid.cloneNode(true));
}
