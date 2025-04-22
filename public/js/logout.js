btn = document.querySelector('select')

btn.addEventListener('change', async(e)=>{
    e.preventDefault() 

    if(btn.value == '3'){ // if the user chooses to log out 
    try{
        
        const res = await fetch('/logout')
        location.assign('/')

    }catch(err){
        console.log("logout.js ", err)
        alert("Can't log out")
    }
}


})