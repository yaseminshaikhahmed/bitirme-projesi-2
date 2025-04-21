const express = require('express');
const mongoose = require('mongoose');
//const path = require('path');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')


const app = express();
const PORT = 5000;

const dbURL = "mongodb+srv://yasmin:8dr9OXJ8BTVhy4U4@cluster0.kneqcji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Middleware
//register view engine
app.set('view engine', 'ejs')
// Serve static files from the "public" directory
app.use(express.static('./public'));
app.use(express.json())
app.use(cookieParser())

// Connect to MongoDB and start the server
mongoose.connect(dbURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.log(err));


//Routes
//apply to all routes
//app.all('{*any}', checkUser, (req, res, next) => {})
//app.get('*', checkUser)
//app.use(checkUser); //not working as expected??

// Basic route
app.get('/', (req, res) => {
    res.render('../public/views/index')
});
//homepage
app.get('/homepage', requireAuth, checkUser, (req, res)=>{
    res.render('../public/views/homepage')
})


app.use(authRoutes)



// //cookies 
// app.get('/set-cookies', (req, res) => {
    
//     //res.setHeader('Set-Cookie', 'newUser=true')
//     res.cookie('newUser', false, { maxAge: 1000*60*60*24, httpOnly:true })
//     res.send('you got the cookie')


// })

// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies
//     console.log(cookies)
//     res.json(cookies)

// })