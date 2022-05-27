var mongoose = require("mongoose");
var ManagerSchema = mongoose.Schema({
    id: String,
    login: String,
    role: String
});
var Managers = mongoose.model("Managers", ManagerSchema);
module.exports = Managers;