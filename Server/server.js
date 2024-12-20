const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const { connectDB } = require("./DB/ConnectDatabase")
const cookieParser = require('cookie-parser');
const cors = require("cors")
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const CategoryRouter = require("./Routes/categoryRoutes")
const SubcategoryRouter = require("./Routes/SubcategoryRouter")
const ProductRouter = require("./Routes/ProductRoutes")
const UserRouter = require("./Routes/UserRouter");
const CheckoutRouter = require("./Routes/CheckoutRouter");
const BannerRouter = require("./Routes/BannerRouter");
const PincodeRouter = require("./Routes/PincodeRouter");

const app = express()

// const corsOptions = {
//     origin: 'http://localhost:3000',  // Frontend URL
//     credentials: true,                // Allow cookies to be sent
// };


// app.use(cors(corsOptions));

app.use(cors())

app.use(cookieParser());


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1050,
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet()); // Set secure HTTP headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Sanitize user input to prevent XSS
app.use(hpp()); // Prevent HTTP Parameter Pollution

app.set(express.static("./Public"))


app.get("/", (req, res) => {
    res.send("Server is running")
})

app.use("/api", CategoryRouter)
app.use("/api", SubcategoryRouter)
app.use("/api", ProductRouter)
app.use("/api", UserRouter)
app.use("/api", CheckoutRouter)
app.use("/api", BannerRouter)
app.use("/api", PincodeRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT} port`)
})

connectDB()