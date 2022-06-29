const express =require('express')
const connectDB = require("./db");
const app = express();
const cors = require('cors');

app.use(cors())

connectDB();


app.use(express.json({ extended: false }));

app.use("/api",require('./routes/user'))
app.use('/api',require('./routes/auth'))


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));