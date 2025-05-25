const appointments = document.getElementById('apps')
const apps = JSON.parse(appointments.textContent)


// 
const date = new Date()
const time =date.getHours() +":" + date.getMinutes()
let m = date.getMonth() + 1
if(m < 10){
    m = '0'+m
}
let day = date.getDate()
if(day < 10){
    day = '0'+day
}

const d = date.getFullYear()+"-"+m+"-"+day

 for(let i = apps.length - 1  ; i >= 0 ; --i){
    let s = 's'+i
    let btn = document.getElementById(s)
    console.log(d==apps[i].date)
    if(d==apps[i].date && (apps[i].time == time || time > apps[i].time)){
        btn.classList.remove('disabled')
    }

 }

 async function startCall(id){
    try{
        const res = fetch(`/appointments/${id}`,{
            method:'PATCH'

        })
        window.location = `/appointments/${id}`
    }
    catch(err){
        alert(err.message)
    }
 }
