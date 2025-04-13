//get errors
const nameError = document.querySelector('.name-error')
const emailError = document.querySelector('.email-error')
const passwordError = document.querySelector('.password-error')

const form = document.querySelector('form')
form.addEventListener('submit', async(e)=>{ //e is the event
    e.preventDefault() // prevents the page from refreshing 

    //reset errors
    nameError.textContent = ''
    emailError.textContent = ''
    passwordError.textContent = ''


    //get the values
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const ver_pass = form.verify_pass.value
    if(password != ver_pass){
        document.getElementById('ver-pass-error').innerHTML="Şifreler eşit değil"
    }
    else{
        try{
            const res = await fetch('/signup', {
                method:"POST",
                body:JSON.stringify({name,email,password}),
                headers: {'Content-Type':'application/json'}
            })
        const data = await res.json()
        //console.log("data = ", data)
         if(data.errors){
            nameError.textContent = data.errors.name
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
    }
})