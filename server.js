const ItemsController = require("./controllers/items_controller");
const ManagersController = require("./controllers/managers_controller.js");
const OrdersController = require("./controllers/orders_controller");

var express = require("express"),
http = require("http"),
mongoose = require("mongoose"),
app = express();

http.createServer(app).listen(3000);
app.use('/', express.static(__dirname + "/client"));
app.use('/managers/:login', express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/VPKurs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log("DB Connected!")
}).catch(err => {
    console.log(Error, err.message);
});

app.get("/reg.html", (req, res) => {
    req.sendFile(path.join(staticPath, "html/reg.html"));
})

app.get("/index.html", (req, res) => {
    req.sendFile(path.join(staticPath, "html/index.html"));
})

app.get("/about.html", (req, res) => {
    req.sendFile(path.join(staticPath, "html/about.html"));
})

app.get("/support.html", (req, res) => {
    req.sendFile(path.join(staticPath, "html/support.html"));
})

app.get("/items.json", ItemsController.index);
app.get("/items/:id", ItemsController.show);
app.post("/items", ItemsController.create);
app.put("/items/:id", ItemsController.update);
app.delete("/items/:id", ItemsController.delete);

app.get("/managers/:login/items.json", ItemsController.index);

app.get("/managers/:login/managers.json", ManagersController.index);

app.get("/managers/:login/myorders/orders.json", OrdersController.index);
app.get("/managers/:login/orderslist/orders.json", OrdersController.allOrd);
app.get("/managers/:login/del/orders.json", OrdersController.DelOrd);

app.post("/managers/:login/orders", OrdersController.create);
app.put("/managers/:login/orders/:id", OrdersController.update);
app.delete("/managers/:login/orders/:id", OrdersController.delete);

app.get("/managers.json", ManagersController.index);
app.post("/managers", ManagersController.create);
app.get("/managers/:login", ManagersController.show);
app.put("/managers/:login", ManagersController.update);
app.delete("/managers/:login", ManagersController.delete);

app.get("/orders.json", OrdersController.index);
app.post("/orders", OrdersController.create);
app.get("/orders/:id", OrdersController.show);
app.put("/orders/:id", OrdersController.update);
app.delete("/orders/:id", OrdersController.delete);