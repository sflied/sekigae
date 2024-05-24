var mytable = document.getElementById("seki");


for (var i=0; i < mytable.rows.length; i++) {
  for (var j=0; j < mytable.rows[i].cells.length; j++) {
    mytable.rows[i].cells[j].id = i + "-" + j;
    mytable.rows[i].cells[j].onclick = clicked;
  }
}

// カスタム１（生徒のグループ分け）
//　＊　グループ１（０indexed）は前組
var stu = [];
for(var i=0; i<40; i++)stu.push(0);
stu[9-1]=stu[14-1]=stu[15-1]=stu[18-1]=stu[21-1]=stu[25-1]=stu[26-1]=stu[30-1]=1;
stu[6-1]=stu[7-1]=2;
stu[8-1]=stu[10-1]=stu[29-1]=3;
stu[11-1]=stu[13-1]=stu[24-1]=4;
stu[23-1]=stu[40-1]=5;
stu[32-1]=6;
//　カスタム１（終わり）
//　カスタム２（前専用の席設定）
var all = [],front = [];
for(var i=1; i<41; i++){
  if(!(i>=1&&i<=4)&&!(i>=8&&i<=11))all.push(i);
  else front.push(i);
}
//　カスタム２（終わり）
//　カスタム３（席をグループ分け）
var exc = [
  [5,6,7,12,13,14,15,16,17,18,21,22,23,25,28,32,33,34,35,39,40],
  [1,2,3,4,8,9,10,11],
  [24,31],
  [19,20,26],
  [36,37,38],
  [29,30],
  [27]
];
//　カスタム３（終わり）
var seen = [];
for(var i=0; i<40; i++)seen.push(0);

//最大値・最小値を引数に持つ関数
function getRandom( min, max ) {
    var random = Math.floor( Math.random() * (max + 1 - min) ) + min;

    return random;
}

var stop = 1;
document.getElementById("stop").onclick = function() {
  stop = 1;
}

function change(x,y,val,col){
  var txt = document.getElementById("seki");
  txt.rows[x].cells[y].textContent = val;
  txt.rows[x].cells[y].style.background = col;
}

function Real(number){
  var id = stu[number-1];
  var seatid = getRandom(0,exc[id].length-1);
  var seat = exc[id][seatid];
  var seati = Math.floor(seat/7);
  var seatj = seat - seati * 7;
  change(seati,seatj,number,"#FFE500");
  setTimeout(function(){change(seati,seatj,number,"#FFFFFF")},1000);
  exc[id].splice(seatid,1);
  if(id != 1)all.splice(all.indexOf(seat),1);
  else front.splice(front.indexOf(seat),1);
}

//document.getElementById("start").onclick = function() 
function SHF(Before,number){
  if(Before != -1){
    var x = Math.floor(Before/7);
    var y = Before - x * 7;
    //txt.rows[x].cells[y].textContent = "";
    change(x,y,"","#FFFFFF");
  }

  var seat=Before;
  if(stu[number-1] != 1){
    do{
      seat = all[getRandom(0,all.length-1)];
    }while(seat==Before&&all.length!=1);
  }
  else {
    do{
      seat = front[getRandom(0,front.length-1)];
    }while(seat==Before&&front.length!=1);
  }
  var seati = Math.floor(seat/7);
  var seatj = seat - seati * 7;
  //txt.rows[seati].cells[seatj].textContent = number;
  change(seati,seatj,number,"#FCF16E");
  
  return seat;
}

function Del(){
  var NUM = document.getElementById("number");
  NUM.value = "";
}

function FILLALL(){
  var cntfill=1;
  const interval = setInterval(function() {
    if (cntfill <= 40) {
      Real(cntfill);
      cntfill++;
    }
    if (cntfill == 41) {
      clearInterval(interval);
    }
  }, 100); 
}

document.getElementById("start").onclick = function() {
  var number = document.getElementById("number").value;
  if(stop==0){
    alert("すでにスタートしています");
    Del();
    return;
  }
  if(number=="FILLALL"){
    FILLALL();
    return;
  }
  if(number.match(/[0-9]+/g) != number){
    alert("半角数字を入力してください");
    Del();
    return;
  }
  if(number < 1 || number > 40){
    alert("出席番号が存在しません");
    Del();
    return;
  }
  if(seen[number-1]==1){
    alert("出席番号が重複しています");
    Del();
    return;
  }
  else seen[number-1]=1;
  number = Math.floor(number);
  let Before = -1;
  stop=0;
  const interval = setInterval(function() {
    if (stop == 0)Before = SHF(Before,number);
    if (stop == 1) {
      if(Before != -1){
        var x = Math.floor(Before/7);
        var y = Before - x * 7;
        change(x,y,"","#FFFFFF");
      }
      Real(number);
      Del();
      clearInterval(interval);
    }
  }, 100);  
}
function clicked(e) {
}
