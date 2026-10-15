/**
 * @desc    Import Core and third party modules
 */
import express from "express";
/**
 * @desc    Custom modules and middlewares
 */

/**
 * Routes
 */
import { AuthRoute, ProductRoute, AddressRoute, UserRoute, CartRoute } from "./routes";
import { errorHandler, notFound } from "./middlewares/error.middleware";

const app = express();

// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/health', (req, res)=> {
    res.status(200).json({ message: "ok" });
})

// Routes
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/products', ProductRoute);
app.use('/api/v1/addresses', AddressRoute);
app.use('/api/v1/users', UserRoute);
app.use('/api/v1/cart', CartRoute);

// Global errors handler
app.use(notFound);
app.use(errorHandler);

export { app };
