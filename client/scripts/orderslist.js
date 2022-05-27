var main = function(OrdersObjects) {
    "use strict";

    var $content = $("<div>");
    $content.addClass("content_order_items");
    for (var i = 0; i < OrdersObjects.length; i++) {
        var $elem = $("<div>"),
        $name = $("<div>"),
        $client = $("<div>"),
        $manager = $("<div>");        

        $elem.addClass("content_order_items_item");
        $name.addClass("content_order_items_item_name");
        $client.addClass("content_order_items_item_client");
        $manager.addClass("content_order_items_item_manager");        

        $elem.append($name);
        $elem.append($client);
        $elem.append($manager);
        $content.append($elem);
        $name.append($("<p>").text(OrdersObjects[i].item));
        $name.append($("<p>").text(OrdersObjects[i].price + " руб"));
        $client.append($("<p>").text(OrdersObjects[i].ClientName));
        $client.append($("<p>").text(OrdersObjects[i].ClientFname));
        $client.append($("<p>").text(OrdersObjects[i].ClientPhone));
        $manager.append($("<p>").text(OrdersObjects[i].manager));
        if(OrdersObjects[i].status === "Выполнен") $manager.append($("<p>").text(OrdersObjects[i].status).css("color", "green"));
        else if(OrdersObjects[i].status === "В обработке") $manager.append($("<p>").text(OrdersObjects[i].status).css("color", "yellow"));
        else $manager.append($("<p>").text(OrdersObjects[i].status).css("color", "red"));
        $manager.append(TakeOrder(OrdersObjects[i], function(){
            console.log("Заказ принят");
        }));
    }
    $("main .content").append($content);
};

var TakeOrder = function(order, callback) {
    var $button = $("<button>").attr("href", "orders/" + order._id);
    $button.addClass("content_order_items_item_button");

    if(order.status === "В обработке" || order.status === "Выполнен" || order.status === "Удален") $button.attr('disabled', true);

    $button.text("Принять");
    $button.on("click", function() {
        $.ajax({
            "url": "/orders/" + order._id,
            "type": "PUT",
            "data": { "take": true, "manager": location.href.split('/')[4], "status": "В обработке" }
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

$(document).ready(function(req) {
    $.getJSON("orderslist/orders.json", function(OrdersObjects) {
        main(OrdersObjects);
    });
});