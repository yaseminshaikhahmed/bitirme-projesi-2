
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
changeApp()



