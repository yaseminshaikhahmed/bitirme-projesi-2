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

let appointments = document.getElementById('appointments-data')
    appointments = JSON.parse(appointments.textContent);


document.getElementById('info').style.display = "none"

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


    
    const daysInMonth = []
    const dates = []


    for(let i = 0 ; i < appointments.length ; ++i ){
      let apps = extract(appointments[i].date)

      if(apps.month - 1 === month && apps.year ===year && appointments[i].completed != true){
       
        daysInMonth.push(apps.day)
        dates.push(appointments[i].date)
      }
      
    }

   daysInMonth.sort()
   dates.sort()
    let t = 0

    for(let date of dates){
      // console.log(date)
      // console.log(typeof(date))
    }

    //calculates when it will move to the next row
    for(var i =daysNum ; i< days.length +daysNum ;++i){
        if(i%7 === 0  && i != 0){
            ++c
        }
        if(daysInMonth[t] == days[wd]){
          document.getElementsByClassName("tr-row")[c].innerHTML += `<td class=" pointer rounded" onclick="showHours('${dates[t]}')"> <div class="me-3 color p-2 rounded">${days[wd++]} </div></td>`
          console.log(dates[t])
          ++t
        }else{
          document.getElementsByClassName("tr-row")[c].innerHTML += `<td class="p-2 pointer"> ${days[wd++]}</td>`
        }
        
     }
  }

  function setCal(month, year){
    fillDate(month, year)
   // console.log(month)
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
  hide()
  
  setCal(Number(monthValue) - 1, Number(year))
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
  hide()

  setCal(Number(monthValue) + 1, Number(year))
  
  
}

var date = new Date()
var month = date.getMonth()
var year = date.getFullYear()
setCal(month, year)


// a function to extract year, month, and day form appointments string like 2025-05-30
function extract(str){
  let year = ""
  let month = ""
  let day = ""
  year = str.substring(0,4)
  
  month = str.substring(5,7)
  
  day = str.substring(8)
  

  year = Number(year)
  month = Number(month)
  day = Number(day)
  // console.log(day)
  // console.log(month)
  // console.log(year)
  return { year, month, day }

}

function showHours(date){
  //console.log(date)
  hideInfo()
  document.getElementById('hours').innerHTML  = ""
  for(let i = 0 ; i < appointments.length ; ++i){
    if(date.localeCompare(appointments[i].date) === 0){ //if these strings are equale
      document.getElementById('hours').innerHTML +=`
      <div class="border m-5 p-3 rounded date-width text-center hour pointer" onclick="showInfo('${appointments[i]._id}')">${appointments[i].time}</div>
    
      
      `}
  }
}

async function showInfo(id){
  //make a request to get information, check the book route
  //console.log(id)

    const div = document.querySelector('.hour');

// Add click effect

  div.classList.add('active');


// Remove effect when clicking outside
document.addEventListener('click', (e) => {
  if (!div.contains(e.target)) {  // If click is outside the div
    div.classList.remove('active');
  }
});
  

  try{
    let app = {}

 const res = await fetch(`/${appointments[0].counselor}/book?app_id=${id}`, {
      headers: {
      'Accept': 'application/json'
      }
      })
  .then(res =>  res.json())
  .then(data => {
    
    app = data.appointment
    console.log(app.date);
  })
  .catch(err => console.error(err))
    console.log(app)
    document.getElementById('order').style.display = "none"
    document.getElementById('info').style.display = "flex"
    document.getElementById('info').innerHTML = `
     <div class="flex-row">
        <p class="pe-2">Tarih:</p>
        <p>${app.date}</p>
    </div>
    <div class="flex-row">
        <p class="pe-2">Saat:</p>
        <p>${app.time}</p>
    </div>
    <div class="flex-row">
        <p class="pe-2">Fiyat:</p>
        <p class="pe-2">${app.price}<span class="ps-2">TL</span></p>
    </div>
    <div class="flex-row">
        <p class="pe-2">Süre:</p>
        <p class="pe-2">${app.duration}<span class="ps-2">DK</span></p>
    </div>
                            `
  }catch(err){
    alert("Can't get info " +  err.message)
    console.log("Can't get info " +  err.message)

  }


}

function hide(){
  document.getElementById("hours").innerHTML = ""
  document.getElementById('order').style.display = "block"
  document.getElementById('info').style.display = "none"
}
function hideInfo(){
  document.getElementById('order').style.display = "block"
  document.getElementById('info').style.display = "none"
}


