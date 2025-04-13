btn = document.getElementById('logout')
btn.addEventListener('change', async(e)=>{
    e.preventDefault() 
    try{
        const res = await fetch('/logout')
        location.assign('/')

    }catch(err){
        console.log("logout.js ", err)
    }
})