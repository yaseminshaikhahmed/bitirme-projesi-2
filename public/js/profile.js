const form = document.querySelector('form')

form.addEventListener('submit', async(e)=>{
    e.preventDefault() 
    //get the values
    const name = form.name1.value
    const pic = form.pic.value
    const bio = form.bio.value
    try{
        const res = await fetch('/profile',{
            method:"PUT",
            body:JSON.stringify({name, pic, bio}),
            headers: {'Content-Type':'application/json'}

        })
        const data = await res.json()
        console.log("data is ",data)
    }catch(err){
        console.log(err)
    }

})