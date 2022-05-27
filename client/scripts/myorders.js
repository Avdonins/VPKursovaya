var main = function(OrdersObjects) {
    "use strict";

    var $content = $("<div>");
    $content.addClass("content_order_items");
    for (var i = 0; i < OrdersObjects.length; i++) {
        var $elem = $("<div>");

        $elem.addClass("content_myorder_items_item");
        $content.append($elem);
        $elem.append($("<p>").text(OrdersObjects[i].item));
        $elem.append($("<p>").text(OrdersObjects[i].price + " руб"));
        $elem.append($("<p>").text(OrdersObjects[i].ClientName));
        $elem.append($("<p>").text(OrdersObjects[i].ClientFname));
        $elem.append($("<p>").text(OrdersObjects[i].ClientPhone));
        $elem.append($("<p>").text(OrdersObjects[i].manager));
        if(OrdersObjects[i].status === "Выполнен") $elem.append($("<p>").text(OrdersObjects[i].status).css("color", "green"));
        else if(OrdersObjects[i].status === "Удален") $elem.append($("<p>").text(OrdersObjects[i].status).css("color", "red"));
        else if(OrdersObjects[i].status === "В обработке") $elem.append($("<p>").text(OrdersObjects[i].status).css("color", "yellow"));
        $elem.append(ReadyOrder(OrdersObjects[i], function(){
            console.log("Заказ выполнен");
        }));
        $elem.append(CancleOrder(OrdersObjects[i], function(){
            console.log("Заказ отменен");
        }));
        $elem.append(DeleteOrder(OrdersObjects[i], function(){
            console.log("Заказ удален");
        }));
    }
    $("main .content").append($content);
};

var ReadyOrder = function(order, callback) {
    var $button = $("<button>").attr("href", "orders/" + order._id);
    $button.addClass("content_order_items_item_button");

    if(order.status === "Выполнен" || order.status === "Удален") $button.attr('disabled', true);

    $button.text("Выполнен");
    $button.on("click", function() {
        $.ajax({
            "url": "/orders/" + order._id,
            "type": "PUT",
            "data": { "ready": true, "status": "Выполнен" }
        }).done(function(responde) {
            callback();
        }).fail(function(err) {
            console.log("Произошла ошибка: " + err);
        });
        location.reload();
        return false;
    });

    return $button;
}

var CancleOrder = function(order, callback) {
    var $button = $("<button>").attr("href", "orders/" + order._id);
    $button.addClass("content_order_items_item_button");

    if(order.status === "Выполнен" || order.status === "Удален") $button.attr('disabled', true);

    $button.text("Отказаться");
    $button.on("click", function() {
        $.ajax({
            "url": "/orders/" + order._id,
            "type": "PUT",
            "data": { "take": true, "manager": null, "status": "Не обработан" }
        }).done(function(responde) {
            callback();
        }).fail(function(err) {
            console.log("Произошла ошибка: " + err);
        });
        location.reload();
        return false;
    });

    return $button;
}

var DeleteOrder = function(order, callback) {
    var $button = $("<button>").attr("href", "orders/" + order._id);
    $button.addClass("content_order_items_item_button");

    if(order.status === "Выполнен" || order.status === "Удален") $button.attr('disabled', true);

    $button.text("Удалить");
    $button.on("click", function() {
        if (confirm("Вы уверены, что хотете удалить заказ клиента " 
        + order.ClientName + " " + order.ClientFname + " на процедуру " + order.item + "?")) {
            $.ajax({
                "url": "/orders/" + order._id,
                "type": "DELETE"
            }).done(function(responde) {
                callback();
            }).fail(function(err) {
                console.log("Произошла ошибка: " + err);
            });
            location.reload();
            return false;
        }
        
    });

    return $button;
}

$(document).ready(function() {
    $.getJSON("myorders/orders.json", function(OrdersObjects) {
        main(OrdersObjects);
    });
});