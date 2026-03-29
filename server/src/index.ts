import express from 'express'
import dotenv from 'dotenv'
import userRoute from './routes/user.Route';
import globalError from './middleware/global_error_handler';
import { dbConnect } from './config/mongoose';
import helmet from 'helmet';
import cors from 'cors'
import productRoute from './routes/product.route';
import wishlistRoute from './routes/wishlist.route';
import purchaseRoute from './routes/purchase.route';

dotenv.config()
const app = express();

const PORT = process.env.PORT || 8001
const URI = process.env.MONGO_URI || "";

app.use(express.json())
app.use(express.urlencoded())
app.use(helmet());
app.use(cors())

///mongodb conection
dbConnect(URI as string)
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/', wishlistRoute)
app.use('/api/purchase/', purchaseRoute)
console.log("request came here")




app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})

app.use(globalError);