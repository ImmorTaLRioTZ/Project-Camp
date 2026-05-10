import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
        console.log(`SUCCESS at http://localhost:${PORT}`);
});
    })
    .catch((err) => {
        console.log(err);
    })


//D:\JavaScript\NODE_BACKEND\src\.env