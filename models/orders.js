var mongoose = require("mongoose"),
ObjectId = mongoose.Schema.Types.ObjectId;
var OrderSchema = mongoose.Schema({
    id: String,
    item: String,
    price: Number,
    ClientName: String,
    ClientFname: String,
    ClientPhone: String,
    manager: String,
    status: {
        type: String,
        default: 'Не обработан'
    }
});
var Orders = mongoose.model("Orders", OrderSchema);
module.exports = Orders;