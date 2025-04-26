const form = document.querySelector('form')

form.addEventListener('submit', async(e)=>{
    //e.preventDefault() 
    //get the values
    const name = form.name1.value
    const picture = form.pic.value
    const bio = form.bio.value
    console.log(name)
    
    try{
        const res = await fetch('/profile',{
            method:"PUT",
            body:JSON.stringify({name, picture, bio}),
            headers: {
                'Authorization': 'token',
                'Content-Type':'application/json'
            }

        })
        

        
    }catch(err){
        console.log(err)
    }

})

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      window.location.reload();
    }
  });