// For the logic of grid-size-range-controller
// When the DOM is first initialize 
// Set the input with id grid-size value to 32
// Set the textContent of label for="grid-size" to 32*32
// Create 4096 of square div in <figure>, with total width and height of 64 respectively

window.addEventListener(
    "DOMContentLoaded", 
    function(e){
        let gridSizeInitValue = 32;
        document.querySelector("#grid-size").value = gridSizeInitValue;
        document.querySelector("label[for='grid-size']").textContent = `${gridSizeInitValue} x ${gridSizeInitValue}`;
        for(let i=0; i<64; i++){
            let figureChildNode = document.createElement("div");
            figureChildNode.setAttribute("data-key", i);
            document.querySelector("figure").appendChild(figureChildNode);
        }
    },
    {
        once: true
    } 
)