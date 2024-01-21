const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://nomanmaniyar:fqz61kCMkJbHUgJG@cluster0.mcnsog5.mongodb.net/")
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String
})
const User = mongoose.model('User', userSchema);
module.exports = { User };