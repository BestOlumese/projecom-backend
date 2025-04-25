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
import productRouter from "./routers/product.routes"
import { errorHandler } from "./middleware/errorHandler";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const app = express();
const port = 8000;

// Configure swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Laptop Finder',
      version: '1.0.0',
      description: 'API Documentation'
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server'
      }
    ]
  },
  apis: ['./routers/*.routes.ts'] // Point to your TypeScript files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
app.use("/api/product", productRouter)

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});