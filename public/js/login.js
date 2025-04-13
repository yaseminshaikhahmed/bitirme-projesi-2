const form = document.querySelector('form')
const emailError = document.querySelector('.email-error')
const passwordError = document.querySelector('.password-error')
form.addEventListener('submit', async(e)=>{ //e is the event
    e.preventDefault() // prevents the page from refreshing 

    //reset errors
    
    emailError.textContent = ''
    passwordError.textContent = ''


    //get the values
    
    const email = form.email.value
    const password = form.password.value

     
        try{
            const res = await fetch('/login', {
                method:"POST",
                body:JSON.stringify({email,password}),
                headers: {'Content-Type':'application/json'}
            })
        const data = await res.json()
        //console.log("data = ", data)
         if(data.errors){
            
            emailError.textContent = data.errors.email
            passwordError.textContent = data.errors.password
         }
         if(data.user){
            //the new user should be directed to the home page
            location.assign('/homepage')
         }
        }catch(err){
            console.log(err)

        }
    
})