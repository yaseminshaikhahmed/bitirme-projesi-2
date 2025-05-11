
let body = document.getElementById('body')

// buttons
const appointments = document.getElementById('appointments')
const messages = document.getElementById('messages')
const feedback = document.getElementById('feedback')
//set the default color of the first button
appointments.style.background = 'gray' 
appointments.style.color = 'white'

//Change the background color of each buttons of the navigation bar
function changeBg(id){
    const clicked = document.getElementById(id)
    appointments.style.background = 'rgb(241,240,241)' 
    appointments.style.color = 'black'
    messages.style.background = 'rgb(241,240,241)' 
    messages.style.color = 'black'
    feedback.style.background = 'rgb(241,240,241)' 
    feedback.style.color = 'black'

    clicked.style.background = 'gray' 
    clicked.style.color = 'white'
    
    
}
//change the appointments content
function changeApp(){

    body.innerHTML = ''
    body.innerHTML = `

    `



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



