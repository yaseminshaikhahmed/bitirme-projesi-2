const form = document.querySelector('form')

form.addEventListener('submit', async(e)=>{ //e is the event
    e.preventDefault() // prevents the page from refreshing 

    //reset errors
    
   


    //get the values
    
    const email = form.email.value
    const password = form.password.value

     
        try{
            const res = await fetch('/counselor-login', {
                method:"POST",
                body:JSON.stringify({email,password}),
                headers: {'Content-Type':'application/json'}
            })
        const data = await res.json()
        console.log("data = ", data)
         
         if(data.counselor){
            //the new user should be directed to the home page
            location.assign('/counselor-homepage')
         }
        }catch(err){
            console.log(err)

        }
    
})