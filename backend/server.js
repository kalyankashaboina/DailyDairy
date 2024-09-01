const express = require("express");
const dotenv = require("dotenv");
const cors=require("cors")
const loginRoute = require("./routes/loginRoute");
const connectDB = require("./config");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use("/", loginRoute);

app.get("/", (req, res) => res.send("Server is running"));

connectDB();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
