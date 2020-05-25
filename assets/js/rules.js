function gel(id){
	return document.getElementById(id);
}
function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}
function cal(t){
	if (t==gel('mm')){
		gel('cm').value=t.value/10;
		gel('inch').value=Math.round(t.value/25.4*100)/100;
	} else if (t==gel('cm')){
		gel('mm').value=t.value*10;
		gel('inch').value=Math.round(t.value/2.54*100)/100;
	} else if (t==gel('inch')){
		gel('mm').value=Math.round(t.value*25.4*10)/10;
		gel('cm').value=Math.round(t.value*2.54*100)/100;
	}
	var inch=gel('inch').value;
	var fractions=gel('fractions').value;
	var fra_in=Math.floor(inch);
	numerator=Math.round((inch-fra_in)/(1/fractions));
	denominator=fractions;
	while((numerator%2==0)&&((denominator%2==0))){numerator/=2;denominator/=2;}
	if(numerator==1 && denominator==1){fra_in+=1;numerator=0;}
	if(fra_in>0){sTemp=fra_in;} else {sTemp='';}
	if(numerator>0){if(fra_in>0){sTemp+=' ';}sTemp+=numerator + '/' + denominator + '"'}
	else {sTemp+='"';} 
	gel('msg').innerHTML= gel('mm').value + ' MM = ' + gel('cm').value + ' CM = ' 
	+ gel('inch').value + ' inches = ' + sTemp;
 
	drawruler();
	
	if (!isNaN(gel('cm').value)){
		drawmark(gel('cm').value*ppcm);
	} 
} 

if (typeof(localStorage)!=="undefined") {
  if (localStorage.getItem("pixels_per_inch")!==null){
	gel('ppi').value=localStorage.getItem("pixels_per_inch");
  }
} else if ((getCookie('ppi')!='') && ( parseFloat(getCookie('ppi'))>50 )){
  gel('ppi').value=getCookie('ppi');
}
gel('s_ppi').innerHTML=gel('ppi').value;

var dpi_x=100.7;
var ppcm=dpi_x/2.54;
var c=document.getElementById("ruler");
var cxt=c.getContext("2d");
var w=c.clientWidth;
var begin_x=20;
var BL_cm=0.5;
var BL_inch=129.5;

function drawruler(){
	if ((gel("ppi").value!='') && (parseFloat(gel("ppi").value)>50)){dpi_x=parseFloat(gel("ppi").value);}
	else {gel("ppi").value==dpi_x;}
	if ((dpi_x<50) || (isNaN(dpi_x))) {dpi_x=100.7;}  
	ppcm=dpi_x/2.54;

	cxt.setTransform(1, 0, 0, 1, 0, 0);
	cxt.clearRect(0, 0, c.width, c.height);
	//ruler for cm
	cxt.strokeStyle ='#000000';
	cxt.fillStyle ='#000000';
	cxt.lineWidth=1;
	cxt.beginPath();
	cxt.moveTo(0,BL_cm);
	cxt.lineTo(w,BL_cm);
	cxt.stroke();

	for(i=begin_x,j=0;i<=w;i=i+ppcm,j++){
	Lh=BL_cm+35; 
	cxt.beginPath();
	cxt.lineWidth=1;
	cxt.moveTo(i,Lh);
	cxt.lineTo(i,BL_cm);
	cxt.stroke();
	cxt.font = "20px Arial";
	if (j<10){ cxt.fillText(j,i-6,Lh+20);
	} else {cxt.fillText(j,i-11,Lh+20);} 

	} 

	s2=ppcm/2;
	for(i=begin_x,j=0;i<=w;i=i+s2,j++){
	if (j%2==0) continue;
	Lh=BL_cm+25; 
	cxt.beginPath();
	cxt.lineWidth=1;
	cxt.moveTo(i,Lh);
	cxt.lineTo(i,BL_cm);
	cxt.stroke();
	}

	s10=ppcm/10;
	for(i=begin_x,j=0;i<=w;i=i+s10,j++){
	if ((j%5==0)||(j%10==0)) continue;
	Lh=BL_cm+15; 
	cxt.beginPath();
	cxt.lineWidth=1;
	cxt.moveTo(i,Lh);
	cxt.lineTo(i,BL_cm);
	cxt.stroke();
	}

	//ruler for inch
	cxt.strokeStyle ='#000000';//线条颜色
	cxt.fillStyle="#000000";
	cxt.lineWidth=1;//设置线宽
	cxt.beginPath();
	cxt.moveTo(0,BL_inch);
	cxt.lineTo(w,BL_inch);
	cxt.stroke();//画线框

	for(i=begin_x,j=0;i<=w;i=i+dpi_x,j++){
	Lh=BL_inch-35; 
	cxt.beginPath();
	cxt.lineWidth=1;
	cxt.moveTo(i,Lh);
	cxt.lineTo(i,BL_inch);
	cxt.stroke();
	cxt.font = "20px Arial";
	if (j<10){cxt.fillText(j,i-6,Lh-5);}
	else {cxt.fillText(j,i-12,Lh-5);}
	}

	s2=dpi_x/2;
	for(i=begin_x,j=0;i<=w;i=i+s2,j++){
	if (j%2==0) continue;
	Lh=BL_inch-30; 
	cxt.beginPath();
	cxt.lineWidth=1;
	cxt.moveTo(i,Lh);
	cxt.lineTo(i,BL_inch);
	cxt.stroke();
	cxt.font = "16px Arial";
	cxt.fillText('½',i-7,Lh-5);
	}                               

	s4=dpi_x/4;
	for(i=begin_x,j=0;i<=w;i=i+s4,j++){
	if ((j%2==0)||(j%4==0)) continue;
	Lh=BL_inch-25; 
	cxt.beginPath();
	cxt.lineWidth=1;
	cxt.moveTo(i,Lh);
	cxt.lineTo(i,BL_inch);
	cxt.stroke();
	cxt.font = "12px Arial";
	if (j%4==1){ cxt.fillText('¼',i-7,Lh-5);}
	else if (j%4==3){ cxt.fillText('¾',i-7,Lh-5);}
	}

	s8=dpi_x/8;
	for(i=begin_x,j=0;i<=w;i=i+s8,j++){
	if ((j%2==0)||(j%4==0)) continue;
	Lh=BL_inch-18; 
	cxt.beginPath();
	cxt.lineWidth=1;
	cxt.moveTo(i,Lh);
	cxt.lineTo(i,BL_inch);
	cxt.stroke();                    
	if (gel('mark18').checked == true){
	cxt.save();
	cxt.font = "12px Arial";
	cxt.scale(0.8,1);
	if (j%8==1){ cxt.fillText('⅛',(i-7)/0.8,Lh-1);}
	else if (j%8==3){ cxt.fillText('⅜',(i-6)/0.8,Lh-1);}
	else if (j%8==5){ cxt.fillText('⅝',(i-6)/0.8,Lh-1);}
	else if (j%8==7){ cxt.fillText('⅞',(i-6)/0.8,Lh-1);}
	cxt.restore();
	}

	}

	if (gel('fractions').value > 8){ 
	s16=dpi_x/16;
	for(i=begin_x,j=0;i<=w;i=i+s16,j++){
	if ((j%2==0)||(j%4==0)||(j%8==0)) continue;
	Lh=BL_inch-15; 
	cxt.beginPath();
	cxt.lineWidth=1;
	cxt.moveTo(i,Lh);
	cxt.lineTo(i,BL_inch);
	cxt.stroke();
	}
	}

	if (gel('fractions').value > 16){ 
	s32=dpi_x/32;
	for(i=begin_x,j=0;i<=w;i=i+s32,j++){
	if ((j%2==0)||(j%4==0)||(j%8==0)||(j%16==0)) continue;
	Lh=BL_inch-10; 
	cxt.beginPath();
	cxt.lineWidth=1;
	cxt.moveTo(i,Lh);
	cxt.lineTo(i,BL_inch);
	cxt.stroke();
	}
	}
	cxt.save();
	cxt.translate(0,0);
	cxt.rotate(90 * Math.PI / 180);
	cxt.font="12px Arial";
	cxt.fillText('MM CM', 3, -2);
	cxt.fillText("INCH", 94, -2);
	cxt.restore();    
	cxt.closePath(); 
}

function drawmark(px){
	cxt.strokeStyle ='#FF0000';
	cxt.lineWidth=1;
	cxt.beginPath();
	cxt.moveTo(begin_x+px,0);
	cxt.lineTo(begin_x+px,130);
	cxt.stroke();

}

function drawAdjuster(){
	var a=document.getElementById("adjuster");
	var ppiv=document.getElementById("ppi").value;

	//clear
	cxt.beginPath();
	cxt.clearRect(begin_x-1,59,c.clientWidth,13);
	cxt.stroke();

	if (a.value>0){
		var w=ppiv*rulers_inch[a.value];
		cxt.strokeStyle ='#FF0000';
		cxt.font="12px Arial";
		cxt.lineWidth=1;
		cxt.beginPath();
		cxt.moveTo(begin_x,0);//60
		cxt.lineTo(begin_x,130);//70
		cxt.moveTo(begin_x+w,0);//60
		cxt.lineTo(begin_x+w,130);
		cxt.stroke();
		cxt.strokeStyle ='#008000';
		cxt.fillStyle="#FFFFFF";
		cxt.beginPath();
		cxt.lineWidth=16;
		cxt.moveTo(begin_x,65);
		cxt.lineTo(begin_x+w,65);
		cxt.stroke();

		var txt=rulers[a.value];
		var txt_width=cxt.measureText(txt).width;
		cxt.beginPath();
		cxt.fillText(txt,begin_x+(w/2)-(txt_width/2),70);
		cxt.stroke();
	}
}

function tempAlert(msg,duration){
 var el = document.createElement("div");
 var left=(window.innerWidth-240)/2;
 el.setAttribute("style","position:fixed;top:70%;left:"+left+"px;border:1px solid #000000;color:#fff7e5;background-color:#0000A0;padding:10px");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}

function save(){
  if ( (typeof(Storage)!=="undefined") ) {
	localStorage.setItem("pixels_per_inch",gel('ppi').value);
	tempAlert('Saved - Pixels per inch : ' + localStorage.getItem("pixels_per_inch"),5000);
  } else {
	setCookie('ppi',gel('ppi').value,365);
	tempAlert('Saved - Pixels per inch : ' + getCookie('ppi'),5000);
  }
  gel('s_ppi').innerHTML=gel('ppi').value;
  drawruler();
}

function restore(){
  setCookie('ppi','',-1);
  localStorage.removeItem("pixels_per_inch");
  gel('ppi').value='100.7';
  gel('s_ppi').innerHTML=gel('ppi').value;
  drawruler();
}

drawruler();