const colors = document.querySelectorAll(".controls__color");
const range = document.querySelector("#jsRange");
const canvas = document.querySelector(".canvas");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");

const ctx = canvas.getContext("2d");

const INITAIL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// canvas background color intialization
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITAIL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle= INITAIL_COLOR;

let painting = false;
let filling = false;

canvas.onmousemove = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

function startPainting() {
  painting = true;
}
function stopPainting() {
  painting = false;
};

canvas.onmousedown = () => {
  startPainting();
};

canvas.onmouseup = () => {
  stopPainting(); 
};

canvas.onmouseleave = () => {
  painting = false
};

// eventListener > hide context menu
canvas.oncontextmenu = (e) => {
  e.preventDefault();
}

// handle the color of the pen
function handleColor(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
};

Array.from(colors).forEach (color => color.addEventListener("click", handleColor));

// change the size of the brush
range.oninput = (e) => {
  const brushSize = e.target.value;
  ctx.lineWidth = brushSize;
}

// fill the canvas with the picekd color
mode.onclick = () => {
  if(filling) {
    filling = false;
    mode.innerHTML = "Fill";
  } else {
    filling = true;
    mode.innerHTML = "Paint";
  }
};

canvas.onclick = () => {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  } 
}

// save the image file from canvas to jpg or png file
save.onclick = () => {
  // canvas data transfer to image
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJs";
  link.click();
}