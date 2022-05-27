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
        $manager.append($("<p>").text(OrdersObjects[i].status).css("color", "red"));
        // $manager.append(TakeOrder(OrdersObjects[i], function(){
        //     console.log("Заказ принят");
        // }));
    }
    $("main .content").append($content);
};

$(document).ready(function(req) {
    $.getJSON("del/orders.json", function(OrdersObjects) {
        main(OrdersObjects);
    });
});