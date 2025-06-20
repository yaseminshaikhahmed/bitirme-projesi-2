select = document.querySelector('select')


//moving to another page
select.addEventListener('change', async(e)=>{
    e.preventDefault() 

    if(select.value == '0'){ // if the user chooses to go to the profile page
        //alert("Profile is clicked")
        try {
            const res = await fetch('/counselor-homepage');
            
            if (res.ok) {
              location.assign('/counselor-homepage');
            } else {
              throw new Error('Unauthorized or failed to fetch profile');
            }
          
          } catch (err) {
            console.log("logout.js", err);
            alert("Can't go to profile page");
          }
          
      select.value = '0'
}else if(select.value == '3'){
  try {
            const res = await fetch('/counselor-feed');
            
            if (res.ok) {
              location.assign('/counselor-feed');
            } else {
              throw new Error('Unauthorized or failed to fetch appointments page');
            }
          
          } catch (err) {
            console.log("logout.js", err);
            alert("Can't go to counselors page");
          }
          
      select.value = '0'
            
          }


})

const requestedApps = document.getElementById('requested')
const reqApps = JSON.parse(requestedApps.textContent)
const reqSize = reqApps.length
function getNot(index){
    const list =[
        "Mesaj gönderdi",//0
        "randuvunu onayladı",//1
        "randuvunu reddetti",//2
        "randuvunu iptal etti"//3
    ]
    console.log(list[index])
    return list[index]

}
// const d = new Date()
// const today = d.getUTCDate()
// console.log("d " + today)
//Let the counselor add available dates manually
const form = document.getElementById("avail-form")
form.addEventListener('submit',async(e)=>{
    try{
    const date = form.date.value
    const time = form.time.value
    const price = form.price.value
    const duration = form.duration.value
    

    const res = await fetch('/counselor-homepage',{
        method:"POST",
        body:JSON.stringify({date, time, price, duration}),
        headers: {'Content-Type':'application/json'}

    })

    }
    catch(err){
    
    }
})




async function deleteDate(id){
    console.log(id)
    try{
        const res = fetch('/counselor-homepage',{
            method:'DELETE',
            headers:{"content-type":"application/json"}

        })
        alert("Date was deleted")
    }catch(err){
        console.log(err.message)
    }
}

async function sendNot(id, name, message){
    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth()+1
    const day = d.getDate()
    const date = day + "." + month + "." + year
    const hour = d.getHours()
    const minutes = d.getMinutes()
    const time = hour + ":" + minutes
    
//     const c = 'c' + i
//    // console.log("c = " + c )
    
//     document.getElementById(c).style.display = 'none'


        const content = name + " " + getNot(message)
        console.log(content)
       return await fetch(`/counselor-homepage/send?app=${id}`,{
            method:'POST',
            body:JSON.stringify({content, date, time}),
            headers:{"content-type":"application/json"}
        })

    
}

async function decline(id, name, i){
    const message = 2
    try {
    const res2 = await sendNot(id, name, message)
    const res = await  fetch(`/counselor-homepage/decline?app=${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' }
        })
    alert("Rededildi")
} catch (err) {
    console.log(err.message);
}
}


async function accept(id, name, i) {
    const message= 1
    const c = 'c'+i
    try{
        const res = await fetch(`/counselor-homepage/accept?app=${id}`,{
            method: 'PATCH',
            headers: { 'content-type': 'application/json' }
        })
       
        const res2 = await sendNot(id, name, message)
        
        if(res.ok){
            

                Swal.fire({
  title: 'Randevu Onaylandı!',
  text:'Kullanıcıya bir bildirim gönderildi',
  icon: 'success',
  confirmButtonColor: '#327775',  // your custom color
  cancelButtonColor: '#6c757d',   // optional if you use a cancel button
  confirmButtonText: 'Okay',
  timer: 2000,
  showConfirmButton: true
})
            document.getElementById(c).style.display = 'none'
        }else{
            Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Onaylanmadı"
});
        }
        if(res2.ok){
            

            //alert("duyuru gonderildi");
            document.getElementById(c).style.display = 'none'
        }else{
            alert("duyuru gonderilmedi")
        }
    }
    catch(err){
        alert(err.message)
        console.log(err.message);
    }
    ///////////////////////////////////
    // const message = 1;
    // const c = 'c' + i;
    // console.log(c)

    // try {
    //     const [res, res2] = await Promise.all([
    //         fetch(`/counselor-homepage/accept?app=${id}`, {
    //             method: 'PATCH',
    //             headers: { 'content-type': 'application/json' }
    //         }),
    //         sendNot(id, name, message)
    //     ]);

    //     console.log("onaylandi");

    //     if (res.ok && res2.ok) {
    //         alert("onaylandi");
    //         document.getElementById(c).style.display = 'none';
    //     } else {
    //         alert("Error");
    //     }
    // } catch (err) {
    //     console.log(err.message);
    // }
}

async function cancel(id, name, i){
    const message= 3
    const j = 'j'+i
    try{
        const res = await fetch(`/counselor-homepage/cancel?app=${id}`,{
            method: 'PATCH',
            headers: { 'content-type': 'application/json' }
        })
       
        const res2 = await sendNot(id, name, message)
        
        if(res.ok && res2.ok){
            

            alert("Seans iptal edildi ve kullanıcıya bir duyuru gönderildi")
            document.getElementById(j).style.display = 'none'
        }
    }
    catch(err){

    }
}
 




function changeMess(){
     body.innerHTML = ''
     body.innerHTML = `
     <!-- Messages -->
             <div class="flex-col">
             <div class="flex-row justify-center"><h3 class="ms-5 mt-5 mb-3">Mesajler</h3></div>
                <!-- message -->
                <div class="bg mb-3 p-3 rounded border flex-col mt-5">
                    <!-- Up -->
                     <div class="flex-row">
                        <!-- Picture and name -->
                         <div class="flex-row align-center">
                            <img src="../images/test2.jpg" alt="">
                            <p class="ms-2"><strong>Ali K.</strong></p>
                         </div>

                         <!-- date -->
                         <div class="flex-row justify-end gray w-75">
                            <p class="me-2">29.03.2025</p>
                            <p>13:42</p>
            
                        </div>
                     </div>
                    <!-- /Up -->
                    <p>Dr. Ahmet çok yardımcı oldu, önerilerini uygulamak hayatımı değiştirdi!</p>
                    <!-- Reply or delete-->
                    <div class="flex-row justify-end gray">
                        <i class="bi bi-reply pointer"></i>
                        <i class="bi bi-trash3 ms-2 pointer"></i>
        
                    </div>
                </div>
             </div>

             <!-- /Messages -->
     
     `
}
const appointments = document.getElementById('accepted')
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

 for(let i = 0  ; i < apps.length ; ++i){
    let s = 's'+i
    let btn = document.getElementById(s)
    console.log(d==apps[i].date)
    if(d==apps[i].date && (apps[i].time == time || time > apps[i].time)){
        btn.classList.remove('disabled')
    }

 }
function changeFeed(){
     body.innerHTML = ''
     body.innerHTML = `
                 <!--FeedBack-->
    <div class="feedback-section m-5 flex-col justify-first">
        <div class="flex-row justify-center"><h3 class="ms-5 mt-5 mb-3">Geri Bildirimler</h3></div>
        <div class="review bg mb-3 p-3 rounded border">
            <!-- Picture and name -->
            <div class="flex-row">
                <!-- Picture and name -->
                 <div class="flex-row align-center">
                    <img src="../images/test2.jpg" alt="">
                    <p class="ms-2"><strong>Ali K.</strong></p>
                 </div>

                 <!-- date -->
                 <div class="flex-row justify-end gray w-75">
                    
                    <p class="me-2">13:42</p>
                    <p>29.03.2025</p>
    
                </div>
             </div>
            <p class="rating">★★★★★</p>
            <p>Dr. Ahmet çok yardımcı oldu, önerilerini uygulamak hayatımı değiştirdi!</p>
            <!-- date of review-->
            
            <div class="flex-row justify-end gray">
                
                <i class="bi bi-trash3 ms-2 pointer"></i>

            </div>
        </div>
        
    </div>
    <!--/FeedBack-->
     `
}

//call changeApp when ever you first visit the page
//changeApp()



