var canvas = document.getElementById("canvas");
var data = [];
var ctx = canvas.getContext("2d");
var colors =["red", "blue", "green", "darkgrey","brown", "grey", "yellow", "pink"];
var total = 0;
var start = (Math.PI*3)/2;
var curent  = start;
var oldStart = start;
ctx.font = '10px Arial';

function addElement(value){
    data[data.length] = value;
    total += value;
    printChart();
}

function  printPieChart(index, val) {
    var radiant = (Math.PI * 2) * (val / total);
    var cx = canvas.height/2+canvas.height/2.8*Math.cos((start + start + radiant)/2);
    var cy = canvas.height / 2+ canvas.height / 2.8*Math.sin((start + start + radiant)/2);
    ctx.fillStyle = colors[index];
    ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 3, start, start+radiant, false);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();
    var text = Math.round(val/total*100) + '%';
    writeProcents(text, cx, cy);
    start += radiant;
    start = start%(Math.PI*2); 
}

function printChart(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var j = 0;
    for (i = 0; i < data.length; i++) {
        if (j >= colors.length) j = 0;
        if (i == data.length-1 && j == 1) j++;
        printPieChart(j, data[i]);
        j++;
    }
}

function writeProcents(text, x, y){
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillStyle = 'black';
    ctx.fillText(text, x, y);
}

addElement(10);
addElement(240);
addElement(340);
addElement(40);
addElement(140);
addElement(240);
addElement(340);
addElement(240);

canvas.addEventListener("mousedown", startRecalculation, false);
document.addEventListener("mouseup", stopRecalculation, false);
document.addEventListener("mousemove", recalculation, false);

var isRecalculation;
function startRecalculation(event) {
    isRecalculation = true;
    var degrees = mousecoordinates(event);
    var degCur = inDeg(curent);
    var cur = degrees - degCur;
    if (cur < 0) {cur += 360};
    curent = inRad(degrees);
    oldStart = start;
    
}

function recalculation(event) {
    if (isRecalculation == true)
    {
        var degrees = mousecoordinates(event);
        var degCur = inDeg(curent);
        var cur = degrees - degCur;
            if (cur < 0) {cur += 360};
        var radians = inRad(degrees);
        
        start = oldStart + inRad(cur);
        printChart();
    }
}

function stopRecalculation() {
    isRecalculation = false;
}

function arctg360(xs, ys) {
    var temp;
    if (ys >= 0 && xs >= 0) {temp = Math.atan(ys/xs)* 180 / Math.PI}
    else if (ys >= 0 && xs < 0 || ys < 0 && xs < 0) {temp = 180 + Math.atan(ys/xs)* 180 / Math.PI}
    else {temp = 360 + Math.atan(ys/xs)* 180 / Math.PI};
    return temp;
} 

function mousecoordinates(event){
        var tempX = event.pageX - canvas.offsetLeft;
        var tempY = event.pageY - canvas.offsetTop;
        var x = tempX - canvas.width/2;
        var y = tempY - canvas.height/2;
        return arctg360(x, y);
        
}

function inRad(degrees){
    return degrees*Math.PI/180;
}

function inDeg(radians){
    return radians*180/Math.PI;
}