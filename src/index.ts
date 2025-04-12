import "dotenv/config";
import express from 'express';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
import cors from "cors";
import authRouter from "./routers/auth.routes"
import vendorRouter from "./routers/vendor.routes"
import userRouter from "./routers/user.routes"
import adminRouter from "./routers/admin.routes"
import categoryRouter from "./routers/category.routes"
import subcategoryRouter from "./routers/subcategory.routes"
import { errorHandler } from "./middleware/errorHandler";


const app = express();
const port = 8000;


app.use(cors({
  credentials: true
}));
app.set("trust proxy", true)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json())
app.use(cookieParser())

// routers
app.use("/api/auth", authRouter);
app.use("/api/vendors", vendorRouter)
app.use("/api/users", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/category", categoryRouter)
app.use("/api/subcategory", subcategoryRouter)

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});