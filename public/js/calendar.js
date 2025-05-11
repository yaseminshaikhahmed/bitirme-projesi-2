/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
const ROWS = 7
const turkishMonths = [
  "Ocak", 
  "Şubat", 
  "Mart", 
  "Nisan", 
  "Mayıs", 
  "Haziran", 
  "Temmuz", 
  "Ağustos", 
  "Eylül", 
  "Ekim", 
  "Kasım", 
  "Aralık"
];


function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
function getWeekDays(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date).getDay());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  

  function fillDate(month, year){
    
    //var date = new Date()
    var days = getDaysInMonth(month, year)
    var weekDays = getWeekDays(month, year)
    

    var firstDay = weekDays[0] 

    //if the first day is monday, then it would result in daysNum = -1
    if(firstDay==0){
      firstDay = 7
    }
    var daysNum = firstDay - 1 
    //console.log("Empty days : " + daysNum)

    //filling empty week days
    for(var j = 0 ; j < daysNum ; ++j){
      document.getElementsByClassName("tr-row")[0].innerHTML += `<td class="p-2"> </td>`
    }

    var c = 0// counter for rows 
    var wd = 0 // counter for columns ids


    

    //calculates when it will move to the next row
    for(var i =daysNum ; i< days.length +daysNum ;++i){
        if(i%7 === 0  && i != 0){
            ++c
        }
        document.getElementsByClassName("tr-row")[c].innerHTML += `<td class="p-2 pointer"> ${days[wd++]}</td>`
     }
  }

  function setCal(month, year){
    fillDate(month, year)
    console.log(month)
    document.getElementById("month").innerHTML = turkishMonths[month]
    document.getElementById("month").setAttribute("value", month)
    
    document.getElementById("year").innerHTML = year

  }

  function goBack(){
   let month =  document.getElementById("month")
   let year = document.getElementById("year").innerHTML
   let monthValue = month.getAttribute("value")
  
    console.log("monthValue = " + monthValue)
  
  for(let i = 0 ; i < ROWS ; ++i){
    document.getElementsByClassName("tr-row")[i].innerHTML=""
  }
  if(monthValue == 0){
    console.log("hello")
    monthValue = 12
    year = year - 1
  }
  
  setCal(monthValue-1, year)
  }


  //>>>>>>>>
  function goForward(){
   let month =  document.getElementById("month")
   let year = document.getElementById("year").innerHTML
   let monthValue = month.getAttribute("value")
  
    console.log("monthValue = " + monthValue)
  
  for(let i = 0 ; i < ROWS ; ++i){
    document.getElementsByClassName("tr-row")[i].innerHTML=""
  }
  if(monthValue == 11){
    
    monthValue = -1
    year = Number(year) + 1
    console.log("monthValue inside the for loop= " + monthValue)
    console.log("year inside the for loop= " + year)

  }

  setCal(Number(monthValue) + 1, Number(year))
  
  
}

var date = new Date()
var month = date.getMonth()
var year = date.getFullYear()
setCal(month, year)
