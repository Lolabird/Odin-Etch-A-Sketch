const container = document.querySelector(".container");
const conWidth = container.clientWidth;
const conHeight = container.clientHeight
const grid = document.createElement("div");
let numGrid = 16;
const gridWidth = conWidth / numGrid;
const gridHeight = conHeight / numGrid;