var mongoose = require("mongoose");
var ItemsSchema = mongoose.Schema({
    id: String,
    description: String,
    tags: [String],
    price: Number
});
var Items = mongoose.model("Items", ItemsSchema);
module.exports = Items;