var Order = require("../models/orders.js"),
    Manager = require("../models/managers.js"),
mongoose = require("mongoose");

var OrdersController = {};
OrdersController.index = function(req, res){
    console.log("Действие: индекс orders");
    var login = req.params.login || null,
        respondWithToDos;
    respondWithToDos = function(query) {
        Order.find(query, function(err, toDos) {
            if (err !== null) {
                res.json(500, err);
            } else {
                res.status(200).json(toDos);
            }
        });
    };
    if (login !== null) {
        console.log("Поиск пользователя: " + login);
        Manager.find({ "login": login }, function(err, result) {
            if (err !== null) {
                res.json(500, err);
            } else if (result.length === 0) {
                res.status(404).json({ "result_length": 0 });
            } else {
                respondWithToDos({ "manager": result[0].login });
            }
        });
    } else {
        respondWithToDos({});
    }
};

OrdersController.allOrd = function(req, res){
    console.log("Действие: индекс Allorders");
    var respondWithToDos;
    respondWithToDos = function(query) {
        Order.find(query, function(err, toDos) {
            if (err !== null) {
                res.json(500, err);
            } else {
                res.status(200).json(toDos);
            }
        });
    };
    respondWithToDos({});
}

OrdersController.DelOrd = function(req, res){
    console.log("Действие: индекс DelOrders");
    Order.find({ status: "Удален" }, function(err, orders) {
        if (err !== null) {
            res.json(500, err);
        } else {
            res.status(200).json(orders);
        }
    });
    // var respondWithToDos;
    // respondWithToDos = function(query) {
        
    // };
    // respondWithToDos({ });
}

OrdersController.show = function(req, res) {
    var id = req.params.id;
    Order.find({ "_id": id }, function(err, order) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (order.length > 0) {
                res.status(200).json(order[0]);
            } else { 
                res.send(404);
            }
        }
    });
};

OrdersController.create = function(req, res){
    console.log("Действие: создать orders");
    var managerID = req.params.manager || null;
    var newOrder = new Order({
        "item": req.body.item,
        "price": req.body.price,
        "ClientName": req.body.ClientName,
        "ClientFname": req.body.ClientFname,
        "ClientPhone": req.body.ClientPhone
    });
    
    Manager.find({ "_id": managerID }, function(err, result) {
        if (err) {
            res.send(500);
        } else {
            if (result.length === 0) {
                newOrder.manager = null;
            } else {
                newOrder.manager = result[0]._id;
            }
            newOrder.save(function(err, result) {
                console.log(result);
                if (err !== null) {
                    console.log(err);
                    res.json(500, err);
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
};

OrdersController.update = function(req, res){
    console.log("Действие: обновить order");
    var id = req.params.id;
    if(req.body.take){
        var newMan = { $set: { manager: req.body.manager, status: req.body.status } };

        Manager.find({ "login": req.body.manager }, function(err, result) {
            if (err) {
                res.send(500);
            } else {
                res.status(404).send("Логин неверный!");
                //console.log(err);
            }
        });

        Order.updateOne({ "_id": id }, newMan, function(err, todo) {
            if (err !== null) {
                res.status(500).json(err);
            } else {
                if (todo.n === 1 && todo.nModified === 1 && todo.ok === 1) {
                    res.status(200).json(todo);
                } else {
                    res.status(404);
                }
            }
        });
    }
    else if(req.body.ready){
        var newOrd = { $set: { status: req.body.status } };

        Order.updateOne({ "_id": id }, newOrd, function(err, todo) {
            if (err !== null) {
                res.status(500).json(err);
            } else {
                if (todo.n === 1 && todo.nModified === 1 && todo.ok === 1) {
                    res.status(200).json(todo);
                } else {
                    res.status(404);
                }
            }
        });
    }
    else{
        newDescription = { $set: { status: req.params.status } };
        Order.updateOne({ "_id": id }, newDescription, function(err, todo) {
            if (err !== null) {
                res.status(500).json(err);
            } else {
                if (todo.n === 1 && todo.nModified === 1 && todo.ok === 1) {
                    res.status(200).json(todo);
                } else {
                    res.status(404).json({ "status": 404 });
                }
            }
        });
    }
    
};

OrdersController.delete = function(req, res){
    console.log("Действие: удалить order");
    var id = req.params.id;
    Order.updateOne({ "_id": id }, { "status": "Удален" }, function(err, order) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (order.n === 1 && order.nModified === 1 && order.ok === 1) {
                res.status(200).json(order);
            } else {
                res.status(404);
            }
        }
    });
};

module.exports = OrdersController;