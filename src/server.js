const express = require('express');
const mongoose = require('mongoose');
const path = require('path')


//const path = require('path');
const authRoutes = require('./routes/authRoutes')
const  cAuthRoutes= require('./routes/conAuthRoutes')
const profileRoutes = require('./routes/profileRoutes')
const homepageRoutes = require('./routes/homepageRoutes')
const conHomepageRoutes = require('./routes/conHomepageRoutes')
const appRoutes = require('./routes/appRoutes')
const conAppRoutes = require('./routes/conAppRoutes')
const messageRoutes = require('./routes/messageRoutes')



const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')



const app = express();
const PORT = 5000;

const dbURL = "mongodb+srv://yasmin:8dr9OXJ8BTVhy4U4@cluster0.kneqcji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Middleware
//register view engine
app.set('view engine', 'ejs')
// Serve static files from the "public" directory
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())
app.use('/images', express.static(path.join(__dirname, 'public/images')));


// Connect to MongoDB and start the server
mongoose.connect(dbURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.log(err));




// Basic route
app.get('/', (req, res) => {
    res.render('../public/views/index')
});

app.get('/counselor-profile',(req, res)=>{
    res.render('../public/views/counselor-profile')
})


app.get('/book-appointment',(req, res)=>{
    res.render('../public/views/book-appointment')
})

// app.get('/counselors',(req, res)=>{
//     res.render('../public/views/counselor-page')
// })


//Middleware
app.use(authRoutes)
app.use(profileRoutes)
app.use(homepageRoutes)
app.use(cAuthRoutes)
app.use(conHomepageRoutes)
app.use(messageRoutes)
app.use(appRoutes)
app.use(conAppRoutes)





