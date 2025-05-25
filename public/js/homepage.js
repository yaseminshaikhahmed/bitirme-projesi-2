btn = document.querySelector('select')


//moving to another page
btn.addEventListener('change', async(e)=>{
    e.preventDefault() 

    if(btn.value == '1'){ // if the user chooses to go to the profile page
        //alert("Profile is clicked")
        try {
            const res = await fetch('/profile');
            
            if (res.ok) {
              location.assign('/profile');
            } else {
              throw new Error('Unauthorized or failed to fetch profile');
            }
          
          } catch (err) {
            console.log("logout.js", err);
            alert("Can't go to profile page");
          }
          
      btn.value = '0'
}else if(btn.value == '4'){
  try {
            const res = await fetch('/counselors');
            
            if (res.ok) {
              location.assign('/counselors');
            } else {
              throw new Error('Unauthorized or failed to fetch counselors page');
            }
          
          } catch (err) {
            console.log("logout.js", err);
            alert("Can't go to counselors page");
          }
          
      btn.value = '0'
            
          }


})
//Posting a feeling

//Get date
function getDate(){
const date2 = new Date()
const year = date2.getFullYear()
const month = date2.getMonth() + 1
const day = date2.getDate()


//adding a zero if any of the values are singular
m = month.toString()
if(m.length == 1){m = "0"+m}
da = day.toString()
if(da.length == 1){da = "0"+da}

//convert date2 into a string

const date = da + "." + m + "."+ year.toString()
return date

}

//get time
function getTime(){
  const date2 = new Date()
const day = date2.getDate()
const hour = date2.getHours()
const minute = date2.getMinutes()


//adding a zero if any of the values are singular
h = hour.toString()
if(h.length == 1){h = "0"+h}

min = minute.toString()
if(min.length == 1){min = "0"+min}

//convert time into a string
const time = h + ":" + min
return time
}
//get the form
const form = document.querySelector('form')



form.addEventListener('submit', async(e)=>{
    e.preventDefault() 
    //get the values
    const date = getDate()
    const time = getTime()
    const content = form.feeling.value
    try{
      const res = await fetch('/homepage', {
        method:"POST",
        body:JSON.stringify({date,time,content}), //this is fine
        headers: {'Content-Type':'application/json'}
    })
      const data = await res.json()
      console.log(data)
      alert("Duygunuz kayidedildi")
    }catch(err){
      console.log(err,"Can't save new feeling homepage.js")
    }




})

async function deleteNot(id){
  try{
      const res = await fetch(`/homepage/delete?id=${id}`, {
        method:"DELETE",
        
        headers: {'Content-Type':'application/json'}
    })
      
      alert("duyuru silindi")
    }catch(err){
      console.log(err,"Can't delete notification homepage.js")
    }


}

function gecenZaman(dateStr, timeStr) {
    const [gun, ay, yil] = dateStr.split('.').map(Number);
    const [saat, dakika] = timeStr.split(':').map(Number);

    const gecmisTarih = new Date(yil, ay - 1, gun, saat, dakika);
    const simdi = new Date();

    const farkMs = simdi - gecmisTarih;

    if (farkMs < 0) {
        return "Gelecekte";
    }

    const farkDakika = Math.floor(farkMs / 60000);
    const farkSaat = Math.floor(farkDakika / 60);
    const farkGun = Math.floor(farkSaat / 24);

    if (farkGun > 0) {
        return `${farkGun} gün önce`;
    } else if (farkSaat > 0) {
        return `${farkSaat} saat önce`;
    } else {
        return `${farkDakika} dakika önce`;
    }
}

// Örnek kullanım:

const notifications = document.getElementById('nots')
const nots = JSON.parse(notifications.textContent)

for(let i = 0 ; i < nots.length ; ++i){
  let t = 't'+i
  document.getElementById(t).innerHTML = gecenZaman(nots[i].date, nots[i].time)
  
} 
console.log();



