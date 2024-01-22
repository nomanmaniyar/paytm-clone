const mongoose = require('mongoose')
const connectionUri = process.env.ALTAS_URI || " ";


mongoose.connect(connectionUri).catch((error) => { console.log("MONGO CONNECTION ERROR: " + error) });
mongoose.connection.once('open', () => {
    console.log('Database connected!')
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

const User = mongoose.model('User', userSchema);
module.exports = { User };