let colors = [0,0,0,0];
const boxes = document.querySelectorAll("[data-index-number]")
function changeColor(nthBox){
    let index = nthBox.getAttribute("data-index-number");
    if(colors[index]>=2){
        colors[index] = 0
    }
    else{
        colors[index] += 1;
    }
    console.log(boxes);
    console.log(boxes[index]);

    boxes.forEach(box =>{
    switch(colors[index]){
        case 0: boxes[index].style.backgroundColor = "yellow"; break;
        case 1: boxes[index].style.backgroundColor = "red"; break;
        case 2: boxes[index].style.backgroundColor = "blue"; break;
        default: break;
    }

    })
}
