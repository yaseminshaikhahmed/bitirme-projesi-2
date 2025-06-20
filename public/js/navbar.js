btn = document.querySelector('select')


//moving to another page
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
}else if(btn.value == '2'){
  try {
            const res = await fetch('/appointments');
            
            if (res.ok) {
              location.assign('/appointments');
            } else {
              throw new Error('Unauthorized or failed to fetch appointments page');
            }
          
          } catch (err) {
            console.log("logout.js", err);
            alert("Can't go to counselors page");
          }
          
      btn.value = '0'
            
          }


})