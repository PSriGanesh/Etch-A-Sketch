let inp = document.querySelector('#inp');
let reset = document.querySelector('#reset');
let line = document.querySelector('#line');
let rainbow = document.querySelector('#rainbow');
let normal = document.querySelector('#normal');
let rflag=false;
let eraser = document.querySelector('#eraser');
let container = document.querySelector('#container');
let cp = document.querySelector('#cp');
let sus=false;
let color = cp.value;
let currentMode = '';
normalMode();
document.body.addEventListener('mouseup',()=>{sus=false;});
cp.addEventListener('change',updateColor);
inp.addEventListener('click',updateGrid);
reset.addEventListener('click',resetPad);
normal.addEventListener('click',normalMode);
line.addEventListener('click',toggleLines);

rainbow.addEventListener('click',()=>
{
	setMode('rainbow');
	currentMode='rainbow';
	if(rflag)
		rflag=false;
	else
		rflag=true;
});


eraser.addEventListener('click',()=>
{
	setMode('eraser');
	currentMode='eraser';
	color='rgb(255,255,255)';
	rflag=false;
});

let x=16;
createGrid(x);

function setMode(c)
{
	if(currentMode=='rainbow')
		rainbow.classList.remove('active');
	if(currentMode=='eraser')
		eraser.classList.remove('active');
	if(currentMode=='normal')
		normal.classList.remove('active');
	if(c=='rainbow')
		rainbow.classList.add('active');
	if(c=='eraser')
		eraser.classList.add('active');
	if(c=='normal')
		normal.classList.add('active');
}

function updateGrid()
{
	x = parseInt(prompt());
	createGrid(x);
}

function createGrid(x)
{
	let canv='';
	let size = 600/x;
	for(let i=0;i<x;i++)
	{
		for(let j=0;j<x;j++)
		{
			canv+=`<div class="ind" style='width: ${size}px; height: ${size}px;'></div>`;
		}
	}
	container.innerHTML = canv;
	
	let boxes = document.querySelectorAll('.ind');
	boxes.forEach((box)=>{
	box.addEventListener('mousedown',()=>
	{
		sus=true;
		if(rflag)
			color = rainbowMode();
		box.style.backgroundColor = `${color}`;
	});
	box.addEventListener('mouseover',()=>
	{
		if(rflag)
			color = rainbowMode();
		if(sus)
			box.style.backgroundColor = `${color}`;
	});
	});
}

function updateColor()
{
	color = cp.value;
}

function resetPad()
{
	createGrid(x);
}

function toggleLines()
{
	let boxes = document.querySelectorAll('.ind');
	boxes.forEach((box)=>
	{
		box.classList.toggle('ind2');
	});
}

function rainbowMode()
{
	let r = Math.floor(Math.random()*256);
	let g = Math.floor(Math.random()*256);
	let b = Math.floor(Math.random()*256);
	return `rgb(${r},${g},${b})`;
}

function normalMode()
{
	rflag=false;
	setMode('normal');
	currentMode='normal';
	color = cp.value;
}
