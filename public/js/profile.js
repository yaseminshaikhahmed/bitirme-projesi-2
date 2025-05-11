const form = document.querySelector('form')


//editing the profile (not completed yet)
form.addEventListener("submit", async (e) => {
    //e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name1.value);
    formData.append('picture', form.picture.files[0]); // use files[0], not value
    formData.append('bio', form.bio.value);

    try {
        const res = await fetch('/profile', {
            method: "PUT",
            body: formData,
            headers: {
                'Authorization': 'token'
                // DON'T set 'Content-Type' here — browser will set it to multipart/form-data automatically with boundary
            }
        });

        const result = await res.json();
        console.log(result);
        alert("Profilin güncellendi")
        

    } catch (err) {
        console.log(err);
    }
});


window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      window.location.reload();
    }
  });

//adding feelingPosts
function addFeelings(){
    const posts = document.getElementById("posts")
    posts.innerHTML = ""
    const postsData = document.getElementById('posts-data');
    const feelingPosts = JSON.parse(postsData.textContent);
    for(let i = 0 ; i < feelingPosts.length ; ++i){
        const id = feelingPosts[i]._id
        console.log(typeof(id)) 
        posts.innerHTML += ` 
        <div class=" rounded m-3 p-4 bg-f post">
                <!-- date -->
                 <div class="flex-row gray">
                    <p class="me-3" id="date">${feelingPosts[i].date}</p>
                    <p id="time">${feelingPosts[i].time}</p>
                 </div>
                 <!-- comment -->
                  <div class="" id="content">
                    
                     ${feelingPosts[i].content} 

                  </div>
                  <div class="flex-row width-100 justify-end">
                   <i class="bi bi-trash3" id="pin" onclick="deletePost('${id}');"></i>
                  </div>
             </div>
        `
    }

}
addFeelings()

async function deletePost(id){
    console.log(id)
    try{
        const res = await fetch('/profile',{
            method:"Delete",
            body:JSON.stringify({_id:id}),
            headers: {
                'Content-Type':'application/json'
            }
    
        })
        alert("Duygu Silindi")
        window.location.reload()

    }
    catch(err){
        console.log(err.message)
    }
}