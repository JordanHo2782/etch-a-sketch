
window.addEventListener(
    "load", 
    function (){
        changeGridControllerLabel(32)
        createGrid(32)
        addFigurePaint();

        // When the input with id grid-size change
        // Read the new input value as gridSize
        // Remove all childnode of the node figure
        // Create new child with the new number
        // Change the label grid-size to match the gridSize

        let gridSizeController = document.querySelector("#grid-size");
        gridSizeController.addEventListener(
            "input",
            function(e){
                newGridSize = gridSizeController.value;
                while(document.querySelector("figure").lastChild){
                    document.querySelector("figure").removeChild(document.querySelector("figure").lastChild) // Remove all childnode of the node figure
                }
                changeGridControllerLabel(newGridSize)
                createGrid(newGridSize)
                addFigurePaint();
            }
        )
    })

// For the logic of grid-size-range-controller
// When the DOM is first initialize 
// Set the input with id grid-size value to 32
// Set the textContent of label for="grid-size" to 32*32
// Create 4096 of square div in <figure>, with total width and height of 64 respectively

function changeGridControllerLabel(gridSize){
    document.querySelector("label[for='grid-size']").textContent = `${gridSize} x ${gridSize}`;
    return gridSize;
}

function createGrid(gridSize){
    let figureWidth = document.querySelector("figure").clientWidth;

    for(let i=0; i<gridSize; i++){
        for(let j=0; j<gridSize; j++){
            let figureChildNode = document.createElement("div");
            figureChildNode.style.width = `${figureWidth / gridSize}px`;
            figureChildNode.style.height = `${figureWidth / gridSize}px`;
            figureChildNode.setAttribute("data-x-key", i);
            figureChildNode.setAttribute("data-y-key", j);
            figureChildNode.setAttribute("draggable", "false");
            document.querySelector("figure").appendChild(figureChildNode);
        }
    }
}

let isDrawing = false;

function addMouseDownEnablePaint(){
    document.querySelectorAll("figure>div").forEach((node)=>{
        node.addEventListener(
            "mousedown",
            function(e){
                isDrawing = true;
                e.preventDefault();
            }
        )
    })
}

function addMouseMovePaint(){
    document.querySelectorAll("figure>div").forEach((node)=>{
        node.addEventListener(
            "mouseover", 
            function(e){
                if(isDrawing){
                    node.classList.add("bg-black");
                }
                e.preventDefault();
            }
        )
    })
}

function addMouseUpDisablePaint(){
    window.addEventListener(
        "mouseup", 
        function(e){
            if(isDrawing){
                isDrawing = false;
            }
        }
    )
}

function addFigurePaint(){
    addMouseDownEnablePaint(); // Set isDrawing true if mousedown on the figure
    addMouseMovePaint() // Change figure>div background color black when mouse pass over the div, if isDrawing is true
    addMouseUpDisablePaint(); // Set isDrawing false in anywhere in the window
}

