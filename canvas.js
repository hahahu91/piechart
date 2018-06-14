var canvas = document.getElementById("canvas");
var data = [];
var ctx = canvas.getContext("2d");
var colors =["red", "blue", "green", "darkgrey","brown", "grey", "yellow", "pink"];
var total = 0;
var start = (Math.PI*3)/2;
var curent  = start;
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
canvas.addEventListener("mouseup", stopRecalculation, false);
canvas.addEventListener("mousemove", recalculation, false);

var isRecalculation;
function startRecalculation(event) {
	// Начинаем рисовать
	isRecalculation = true;
	curent = start;
	// Создаем новый путь (с текущим цветом и толщиной линии) 
	//context.beginPath();
	
	// Нажатием левой кнопки мыши помещаем "кисть" на холст
	//context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}
function recalculation(event) {
    if (isRecalculation == true)
    {
        // Определяем текущие координаты указателя мыши
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;
        var xs = x - canvas.height/2;
        var ys = y - canvas.height/2;;
        
        function arctg360(xs, ys) {
            var temp;
            if (ys >= 0 && xs >= 0) {temp = Math.atan(ys/xs)* 180 / Math.PI}
            else if (ys >= 0 && xs < 0 || ys < 0 && xs < 0) {temp = 180 + Math.atan(ys/xs)* 180 / Math.PI}
            else {temp = 360 + Math.atan(ys/xs)* 180 / Math.PI};
            return temp;
        } 
        //curent = arctg360(xs, ys)*Math.PI/180;
        console.log(arctg360(xs, ys)*Math.PI/180)
        console.log('st', start, curent);
        function asdd (){
            var asd =  (arctg360(xs, ys)*Math.PI/180);
            return asd;
        }
        start = asdd();
        console.log(start, asdd());
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