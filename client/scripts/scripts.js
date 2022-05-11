var main = function(toDoObjects) {
    "use strict";

    $(".main_tabs_item span").toArray().forEach(function(element) {
        $(element).on("click", function() {

            var $element = $(element),
                $content;

            $(".main_tabs_item span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {

                $content = $("<div>");
                $content.addClass("content_items");
                for (var i = 0; i < toDoObjects.length; i++) {
                    if(toDoObjects[i].tags.includes("маникюр")){
                        var $elem = $("<div>"),
                            $name = $("<div>"),
                            $price = $("<div>"),
                            $button = $("<button>").text("Записаться");
                        $elem.addClass("content_items_item");
                        $name.addClass("content_items_item_name");
                        $price.addClass("content_items_item_price");
                        $button.addClass("content_items_item_button");

                        $button.on("click", buttonOnZap);

                        $elem.append($name);
                        $elem.append($price);
                        $elem.append($button);
                        $content.append($elem);
                        $name.append($("<p>").text(toDoObjects[i].description));
                        $price.append($("<p>").text(toDoObjects[i].price + " руб"));
                    }
                }
                $("main .content").append($content);

            } else if ($element.parent().is(":nth-child(2)")) {

                $content = $("<div>");
                $content.addClass("content_items");
                for (var i = 0; i < toDoObjects.length; i++) {
                    if(toDoObjects[i].tags.includes("педикюр")){
                        var $elem = $("<div>"),
                            $name = $("<div>"),
                            $price = $("<div>"),
                            $button = $("<button>").text("Записаться");
                        $elem.addClass("content_items_item");
                        $name.addClass("content_items_item_name");
                        $price.addClass("content_items_item_price");
                        $button.addClass("content_items_item_button");

                        $button.on("click", buttonOnZap);

                        $elem.append($name);
                        $elem.append($price);
                        $elem.append($button);
                        $content.append($elem);
                        $name.append($("<p>").text(toDoObjects[i].description));
                        $price.append($("<p>").text(toDoObjects[i].price + " руб"));
                    }
                }
                $("main .content").append($content);

            } else if ($element.parent().is(":nth-child(3)")) {

                $content = $("<div>");
                $content.addClass("content_items");
                for (var i = 0; i < toDoObjects.length; i++) {
                    if(toDoObjects[i].tags.includes("лечение")){
                        var $elem = $("<div>"),
                            $name = $("<div>"),
                            $price = $("<div>"),
                            $button = $("<button>").text("Записаться");
                        $elem.addClass("content_items_item");
                        $name.addClass("content_items_item_name");
                        $price.addClass("content_items_item_price");
                        $button.addClass("content_items_item_button");

                        $button.on("click", buttonOnZap);

                        $elem.append($name);
                        $elem.append($price);
                        $elem.append($button);
                        $content.append($elem);
                        $name.append($("<p>").text(toDoObjects[i].description));
                        $price.append($("<p>").text(toDoObjects[i].price + " руб"));
                    }
                }
                $("main .content").append($content);
            }
            return false;
        });
    });
    $(".main_tabs_item:first-child span").trigger("click");
};

var buttonOnZap = function(){
    var $content = $("<div>"),
        $popup = $("<div>"),
        $button = $("<button>").text("Записаться"),
        $lableName = $("<label>").text("Введите ваше имя"),
        $lableFName = $("<label>").text("Введите вашу фамилию"),
        $lablePhone = $("<label>").text("Введите ваш телефон");
    $content.addClass("content_container_popup");
    $popup.addClass("content_popup");
    $button.addClass("content_popup_button")
    
    $button.on("click", popUpHide);
    $popup.append($lableName);
    $popup.append($("<input>").addClass("content_popup_input"));
    $popup.append($lableFName);
    $popup.append($("<input>").addClass("content_popup_input"));
    $popup.append($lablePhone);
    $popup.append($("<input>").addClass("content_popup_input"));
    
    $popup.append($button);
    $content.append($popup);
    $("main").append($content);
}

function popUpShow(){
    $(".content_container_popup").show();
}

function popUpHide(){
    $(".content_popup").empty();
    $(".content_popup").append($("<label>").addClass("sucscess").text("Успешно!"));
    setTimeout(() => {
        $(".content_container_popup").hide();
    }, 3000);
}

$(document).ready(function() {
    $.getJSON("list.json", function(toDoObjects) {
        main(toDoObjects);
    });
});