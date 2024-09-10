const express=require('express');
const app=express();
const dotenv = require('dotenv');
const cors=require('cors')

dotenv.config({ path: './.env' });
require('./db/config');

const authRoutes=require("./Routes/authRoutes")
const restaurantRoutes=require("./Routes/restaurantRoutes")
const reviewRoutes=require("./Routes/reviewRoutes")
const cartRoutes=require("./Routes/cartRoutes")

app.use(express.json());
app.use(cors());

app.use("/api/v1/users",authRoutes);
app.use("/api/v1/restaurant",restaurantRoutes)
app.use("/api/v1/review",reviewRoutes)
app.use("/api/v1/cart",cartRoutes)


app.listen(process.env.PORT, '127.0.0.1', () => {
    console.log('Server is listening on port 8000');
});