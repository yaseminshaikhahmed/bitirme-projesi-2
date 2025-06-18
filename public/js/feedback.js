let selectedRating = 0;
let finalRate = 0
const info = document.getElementById('session')
const sessionData = JSON.parse(info.textContent)
console.log(sessionData)


function fill(element) {
    const id = parseInt(element.id);
    for (let i = 1; i <= id; ++i) {
        document.getElementById(i).style.color = "orange";
    }
    for (let i = id + 1; i <= 5; ++i) {
        document.getElementById(i).style.color = "#ddd";
    }
}

function unfill() {
    for (let i = 1; i <= 5; ++i) {
        if (i <= selectedRating) {
            document.getElementById(i).style.color = "orange";
        } else {
            document.getElementById(i).style.color = "#ddd";
        }
    }
}

function rate(element) {
    selectedRating = parseInt(element.id);
    for (let i = 1; i <= 5; ++i) {
        if (i <= selectedRating) {
            document.getElementById(i).style.color = "orange";
        } else {
            document.getElementById(i).style.color = "#ddd";
        }
    }
    finalRate =  selectedRating

}

document.getElementById("feedbackForm").addEventListener("submit", async function(e){
  e.preventDefault();  // prevent form from redirecting

  const rating = finalRate;
  const date = getDate();
  const time = getTime();
  const content = document.getElementById("comment").value;

  try {
    const res = await fetch(`/feedback/${sessionData._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ time, date, rating, content })
    });

    
    
    Swal.fire({
  title: 'Geri bildirim gönderildi!',
  icon: 'success',
  confirmButtonColor: '#327775',  // your custom color
  cancelButtonColor: '#6c757d',   // optional if you use a cancel button
  confirmButtonText: 'Okay',
  timer: 2000,
  showConfirmButton: true
})
  
  } catch(err) {
    alert("Error submitting feedback", err.message);
  }
});


function getDate(){
const date2 = new Date()
const year = date2.getFullYear()
const month = date2.getMonth() + 1
const day = date2.getDate()


//adding a zero if any of the values are singular
m = month.toString()
if(m.length == 1){m = "0"+m}
da = day.toString()
if(da.length == 1){da = "0"+da}

//convert date2 into a string

const date = da + "." + m + "."+ year.toString()
return date

}

function getTime(){
  const date2 = new Date()
const day = date2.getDate()
const hour = date2.getHours()
const minute = date2.getMinutes()


//adding a zero if any of the values are singular
h = hour.toString()
if(h.length == 1){h = "0"+h}

min = minute.toString()
if(min.length == 1){min = "0"+min}

//convert time into a string
const time = h + ":" + min
return time
}