var Item = require("../models/items.js"),
mongoose = require("mongoose");

var ItemsController = {};
ItemsController.index = function(req, res){
    console.log("Действие: индекс items");
    Item.find(function(err, item){
        if(err !== null){
            res.json(500, err);
        } else{
            res.status(200).json(item);
        }
    });
};

ItemsController.show = function(req, res){
    console.log("Действие: показать");
    Item.find({'id': req.params.id}, function(err, result){
        if(err){
            console.log(err);
        } else if(result.length !== 0){
            res.sendfile('..client/index.html')
        } else {
            res.send(404);
        }
    });
};

ItemsController.create = function(req, res){
    console.log("Действие: создать услугу");
    var description = req.body.description;
    Item.find({ "description": description }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.status(501).send("Услуга уже существует");
            console.log(err);
            console.log("Услуга уже существует");
        } else {
            var newItem = new Item({
                "description": description,
                "price": req.body.price,
                "tags": req.body.tags
            });
            newItem.save(function(err, result) {
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

ItemsController.update = function(req, res){
    console.log("Действие: обновить услугу");
    var id = req.params.id;
    var newItem = { $set: { description: req.body.description, price: req.body.price, tags: req.body.tags } };
    Item.updateOne({ "_id": id }, newItem, function(err, item) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (item.n === 1 && item.nModified === 1 && item.ok === 1) {
                res.status(200).json(item);
            } else {
                res.status(404);
            }
        }
    });
};

ItemsController.delete = function(req, res){ //Маникюр + гель-лак + снятие 1000руб
    console.log("Действие: удалить услугу");
    var id = req.params.id;
    Item.deleteOne({ "_id": id }, function(err, item) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (item.n === 1 && item.ok === 1 && item.deletedCount === 1) {
                res.status(200).json(item);
            } else {
                res.status(404);
            }
        }
    });
};

module.exports = ItemsController;