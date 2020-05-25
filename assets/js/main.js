function ResetCanvasSize(){
	if(navigator.userAgent.match(/iPhone/i)){ 
	  document.getElementById("ruler").width=window.innerWidth-20;
	} else {
	  if (screen.width>800){
		document.getElementById("ruler").width=screen.width-34;
	  } else {
		document.getElementById("ruler").width=screen.width-20;
	  } 
	}
}
ResetCanvasSize();

window.onresize=function(){
	ResetCanvasSize();
	drawruler();
};

var isDragging=false;
var DDX=0;
var DSV=0;
function handleMouseDown(e){
  if(document.getElementById("adjuster").value!=''){
	isDragging=true;DDX=e.clientX;
	DSV=document.getElementById("ppi").value;
  } else {
	if(typeof(begin_x)!="undefined" && begin_x!==null) {
	  drawruler();
	  var clickX=e.pageX-begin_x-e.target.offsetLeft;
	  drawmark(clickX);
	}
  }
}
function handleMouseUp(e){isDragging=false;}
function handleMouseOut(e){isDragging=false;}
function handleMouseMove(e){
  if((isDragging)&&(document.getElementById("adjuster").value!='')){
	var MouseX=parseInt(e.clientX-DDX);
	document.getElementById("ppi").value=parseFloat(DSV)+MouseX/10;
	drawruler();
	drawAdjuster();
  }
}

var c=document.getElementById("ruler");
c.addEventListener("mousedown", handleMouseDown);
c.addEventListener("mouseup", handleMouseUp);
c.addEventListener("mouseout", handleMouseOut);
c.addEventListener("mousemove", handleMouseMove);

function refrest_btnAdjust(){
	var a=document.getElementById('adjuster');
	var b=document.getElementById('btnAdjust');
	var div=document.getElementById('div_description');
	if (a.value>0){
	  b.style.display='block';
	  div.style.display='none';
	}else {
	  b.style.display='none';
	  div.style.display='block';
	} 
}
function changeppi(f){
	var ppi=document.getElementById('ppi');
	ppi.value=parseFloat(ppi.value)+f;
	drawruler();
	drawAdjuster();
}

