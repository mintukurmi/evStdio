const mongoose = require("mongoose");
const dotenv = require("dotenv");

// dotenv init
dotenv.config();
async function main() {
    const success = await mongoose.connect(process.env.MONGO_DB_URI);
}

main()
    .then((success) => {
        console.log("Connected to database");
    })
    .catch((err) => console.log(err));