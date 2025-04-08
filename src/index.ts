import "dotenv/config";
import express from 'express';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
import cors from "cors";
import authRouter from "./routers/auth.routes"
import vendorRouter from "./routers/vendor.routes"
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

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});