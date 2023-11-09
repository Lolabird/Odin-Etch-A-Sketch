function createGrid(num) {
    const container = document.querySelector(".container");
    const conWidth = container.clientWidth;
    const conHeight = container.clientHeight
    const grid = document.createElement("div");
    const gridArea = num ** 2;
    const gridWidth = conWidth / num;
    const gridHeight = conHeight / num;

    grid.classList.add("grid");
    grid.style.width = gridWidth + 'px';
    grid.style.height = gridHeight + 'px';

    for (let i = 0; i < gridArea; i++){
        container.appendChild(grid.cloneNode(true));
    }
}

let numGrid = 16; //will use this later to prompt user

createGrid(numGrid);


