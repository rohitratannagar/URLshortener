const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')

const urlRoute = require('./routes/url.routes');
const userRoute = require('./routes/user.routes');
const staticRoute = require('./routes/static.routes');
const adminRoute = require('./routes/admin.routes')
const allUsersRoute = require('./routes/allUsers.routes')
const dotenv = require("dotenv")

dotenv.config();

const {checkForAuthentication, restrictTo} = require('./middlewares/auth.middleware');

const connectDB = require('./connection.js');
const URL = require('./models/url.models')
const PORT = process.env.PORT || 8000;
const app = express();

connectDB(process.env.MONGODB_URI)
.then(()=>console.log('DB connected successfully'))
.catch((err)=> console.log(err));

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/',staticRoute); 
app.use('/user',userRoute);
app.use('/url', restrictTo (['USER', 'ADMIN']), urlRoute);
app.use('/admin',restrictTo(['ADMIN']),adminRoute);
app.use('/allUsers',restrictTo (['USER', 'ADMIN']),allUsersRoute);

app.listen(PORT, ()=>{
    console.log(`server started http://localhost:${PORT}`);
})