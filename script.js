
window.addEventListener(
    "load", 
    function (){
        changeGridControllerLabel(32);
        createGrid(32);
        addFigurePaint();
        addFigureOnClickShade();

        // When the input with id grid-size change
        // Read the new input value as gridSize
        // Remove all childnode of the node figure
        // Create new child with the new number
        // Change the label grid-size to match the gridSize

        document.querySelector("#color-picker").addEventListener(
            "input",
            function(e){
                document.querySelector("#color-picker").backgroundColor = document.querySelector("#color-picker").value;

            }
        );
        
        document.querySelector("#color-mode-btn").addEventListener(
            "click",
            function(e){
                isEraseEnabling = false;
                isRainbowEnabling = false;
                isColorEnabling = true;
                isLightening = false;
                isShading = false;
            }
        );

        document.querySelector("#rainbow-mode-btn").addEventListener(
            "click",
            function(e){
                isEraseEnabling = false;
                isColorEnabling = false;
                isRainbowEnabling = true;
                isLightening = false;
                isShading = false;
            }
        );

        document.querySelector("#erase-btn").addEventListener(
            "click",
            function(e){
                isEraseEnabling = true;
                isLightening = false;
                isShading = false;
            }
        );

        document.querySelector("#clear-btn").addEventListener(
            "click",
            function(e){
                isEraseEnabling = false;
                isLightening = false;
                isShading = false;
                resetFigure();
            }
        );

        document.querySelector("#toggle-shading-btn").addEventListener(
            "click",
            function(e){
                isDrawing = false;
                isEraseEnabling = false;
                isRainbowEnabling = false;
                isColorEnabling = false;
                isLightening = false;
                isShading = !isShading;
            }
        );

        document.querySelector("#toggle-lightening-btn").addEventListener(
            "click",
            function(e){
                isDrawing = false;
                isEraseEnabling = false;
                isRainbowEnabling = false;
                isColorEnabling = false;
                isShading = false;
                isLightening = !isLightening;
            }
        )

        document.querySelector("#grid-size").addEventListener(
            "input",
            function(e){
                isEraseEnabling = false;
                resetFigure();
            }
        );
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
let isEraseEnabling = false;
let isRainbowEnabling = false;
let isColorEnabling = true;
let isShading = false;
let isLightening = false;

function addMouseDownEnablePaint(){
    document.querySelectorAll("figure>div").forEach((node)=>{
        node.addEventListener(
            "mousedown",
            function(e){
                if (!(isShading || isLightening)){
                    isDrawing = true;
                }
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
                if (isDrawing & isEraseEnabling){
                    node.style.backgroundColor = "rgb(255, 255, 255)";
                } else if (isDrawing & isRainbowEnabling){
                    node.style.backgroundColor = `rgb(${genRan2by8Value()}, ${genRan2by8Value()}, ${genRan2by8Value()})`;
                } else if(isDrawing & isColorEnabling){
                    node.style.backgroundColor = document.querySelector("#color-picker").value;
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

function resetFigure(){
    let newGridSize = document.querySelector("#grid-size").value;
    while(document.querySelector("figure").lastChild){
        document.querySelector("figure").removeChild(document.querySelector("figure").lastChild) // Remove all childnode of the node figure
    } // Remove all childnode of the node figure
    changeGridControllerLabel(newGridSize) // Change the label grid-size to match the gridSize 
    createGrid(newGridSize) // Create new child with the new number of gridSize
    addFigurePaint(); // Add when mouse over figure > div paint behavior
    addFigureOnClickShade();
}
function genRan2by8Value(){
    // Generate random number from 0 to (2^8) - 1
    return Math.floor(Math.random() * 255);
}

function addFigureOnClickShade(){
    document.querySelectorAll("figure>div").forEach((node)=>{
        node.addEventListener(
            "click",
            function(e){
                
                if(!node.style.backgroundColor){
                    node.style.backgroundColor = "rgb(0, 0, 0)";
                }

                let colorArr = node.style.backgroundColor.slice(
                    node.style.backgroundColor.indexOf("(") + 1, 
                    node.style.backgroundColor.indexOf(")")
                ).split(", ");

                colorArr = colorArr.map((value)=>{
                    return parseInt(value);
                })

                if(isLightening){
                    colorArr = colorArr.map((value)=>{
                        if((value+15)<255){
                            value += 15;
                        }else{
                            value = 255;
                        }
                        return value;
                    })
                }

                if(isShading){
                    colorArr = colorArr.map((value)=>{
                        if((value-15)>0){
                            value -= 15;
                        }else{
                            value = 0;
                        }
                        return value;
                    })
                }
                node.style.backgroundColor = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
            }
        );
    })
}
