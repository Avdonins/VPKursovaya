var Managers = require("../models/managers.js"),
    Orders = require("../models/orders.js"),
mongoose = require("mongoose");

var ManagersController = {};
ManagersController.index = function(req, res){
    console.log("Действие: индекс manager");
    Managers.find(function(err, manager){
        if(err !== null){
            res.json(500, err);
        } else{
            res.status(200).json(manager);
        }
    });
};

ManagersController.show = function(req, res){
    console.log("Действие: показать manager");
    Managers.find({'login': req.params.login}, function(err, result){
        if(err){
            console.log(err);
        } else if (result.length !== 0) {
            res.sendfile('./client/orderslist.html');
        } else {
            res.send(404);
        }
    });
};

ManagersController.create = function(req, res) {
    console.log('Вызвано действие: создать менеджера');
    var login = req.body.login,
        role = req.body.role;
    Managers.find({ "login": login }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.status(501).send("Менеджер уже существует");
            console.log(err);
            console.log("Менеджер уже существует");
        } else {
            var newManager = new Managers({
                "login": login,
                "role": role
            });
            newManager.save(function(err, result) {
                console.log(err);
                if (err !== null) {
                    res.json(500, err);
                } else {
                    res.json(200, result);
                    console.log(result);
                }
            });
        }
    });
};

ManagersController.update = function(req, res) {
    console.log("Вызвано действие: обновить менеджера");
    var login = req.params.login;
    console.log("Старый логин менеджера: " + login);
    var newUsername = { $set: { login: req.body.login, role: req.body.role } };
    console.log("Новый логин менеджера: " + req.body.login);

    Orders.find({ "manager": login  }, function(err, element){
        if(err){
            res.send(500, err);
            console.log(err);
        } else {
            element.forEach(elem => {
                Orders.updateOne({ "_id": elem._id }, { $set: { manager: req.body.login }}, function(err, result){
                    if (err !== null) {
                        res.json(500, err);
                    } else {
                        res.json(200, result);
                        console.log(result);
                    }
                });
            });
        }
        
    });

    Managers.updateOne({ "login": login }, newUsername, function(err, manager) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            console.log(manager);
            if (manager.n === 1 && manager.nModified === 1 && manager.ok === 1) {
                console.log('Изменен');
                res.status(200).json(manager);
            } else {
                res.status(404);
            }
        }
    });
};


ManagersController.delete = function(req, res) {
    console.log("Вызвано действие: удалить менеджера");
    var login = req.params.login;

    Managers.find({ "login": login }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            console.log("Удаляем все orders с 'manager': " + result[0].login);
            Orders.find({ "manager": login  }, function(err, element){
                element.forEach(elem => {
                    if(elem.status === "Выполнен") Orders.deleteOne({ "_id": elem._id }, function(err, result){
                        console.log(result);
                    });
                    else if (elem.status === "В обработке") {
                        Orders.updateOne(
                            { "_id": elem._id }, 
                            { $set: {status: "Не обработано", manager: "" } },
                            function(err, result){
                                console.log(result);
                            });
                    }else if (elem.status === "Удален") {
                        Orders.updateOne(
                            { "_id": elem._id }, 
                            { $set: { manager: "(удален)" } },
                            function(err, result){
                                console.log(result);
                            });
                    }
                });
            });
            console.log("Удаляем менеджера");

            Managers.deleteOne({ "login": login }, function(err, manager) {
                if (err !== null) {
                    res.status(500).json(err);
                } else {
                    if (manager.n === 1 && manager.ok === 1 && manager.deletedCount === 1) {
                        res.status(200).json(manager);
                    } else {
                        res.status(404);
                    }
                }
            });
        } else {
            res.status(404).send("Менеджера не существует");
            console.log(err);
        }
    });
}

module.exports = ManagersController;