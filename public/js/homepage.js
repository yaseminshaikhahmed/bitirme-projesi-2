btn = document.querySelector('select')

btn.addEventListener('change', async(e)=>{
    e.preventDefault() 

    if(btn.value == '1'){ // if the user chooses to go to the profile page
        //alert("Profile is clicked")
        try {
            const res = await fetch('/profile');
            
            if (res.ok) {
              location.assign('/profile');
            } else {
              throw new Error('Unauthorized or failed to fetch profile');
            }
          
          } catch (err) {
            console.log("logout.js", err);
            alert("Can't go to profile page");
          }
      btn.value = '0'
}


})

