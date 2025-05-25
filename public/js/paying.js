   
   
   const info_data = document.getElementById('info-data')
   const info = JSON.parse(info_data.textContent)
   console.log(info)
   
   const button = document.getElementById('book')
   button.addEventListener('click',async (e)=>{
 try{
    
  const res = await fetch(`/${info.counselor}/book?app_id=${info._id}`,{
    method:'PATCH',
    //body:'',
    headers:{
      'content-type':'application/json'
    }
  })
  if(res){
    alert('randevu alindi')
   window.location.href  = `/appointments/p/${info._id}` 
  }
  else{
    alert('randevu alinmiyor')
  }
  

 }catch(err){
  console.log(err.message)
 }
  
 })