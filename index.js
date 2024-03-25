require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');


//Routers

//Authentication Routers
const signupRoute = require("./routes/Authentication/signup");
const loginRoute = require("./routes/Authentication/login");
const logoutRoute = require("./routes/Authentication/logout");
const verifyRoute = require("./routes/Authentication/verify");
const resendtokenRoute = require("./routes/Authentication/resendtoken");
const passwordResetRoute = require("./routes/Authentication/resetPassword");

//USer Routers
const userRoute = require("./routes/UserInformation/user");
const uploadRoute = require("./routes/UserInformation/uploadimage");
const fetchimageRoute = require("./routes/UserInformation/fetchimage");
const updatedInfoRoute = require("./routes/UserInformation/updateInfo");
const changepasswordRoute = require("./routes/UserInformation/changepassword");




const corsConfig = {
    credentials: true,
    origin: true,
};


app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public',express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());
app.use('/profilepicture', express.static(path.join(__dirname, '/public/images/profilepicture')));


//Database
connectDB();



//Routes

//Authentication Routes
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/users", verifyRoute);
app.use("/api/resend", resendtokenRoute);
app.use("/api/password-reset", passwordResetRoute);

//User Routes
app.use("/api/user", userRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/fetchimage", fetchimageRoute);
app.use("/api/updateinfo", updatedInfoRoute);
app.use("/api/changepassword", changepasswordRoute);




const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on ${port}`)
});