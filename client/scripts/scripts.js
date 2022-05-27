var main = function(ItemsObjects, flag) {
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
                for (var i = 0; i < ItemsObjects.length; i++) {
                    if(ItemsObjects[i].tags.includes("маникюр")){
                        var $elem = $("<div>"),
                            $name = $("<div>"),
                            $price = $("<div>"),
                            $button = $("<button>").text("Записаться");
                        if(flag){
                            $button.hide();
                        }
                        $elem.addClass("content_items_item");
                        $name.addClass("content_items_item_name");
                        $price.addClass("content_items_item_price");
                        $button.addClass("content_items_item_button");

                        $elem.append($name);
                        $elem.append($price);
                        $elem.append($button);
                        if(flag) {
                            $elem.append(buttonOnRed(ItemsObjects[i], function(){
                                console.log("Услуга отредактирована");
                            }));
                            $elem.append(buttonOnDel(ItemsObjects[i], function(){
                                console.log("Услуга удалена");
                            }));
                        }
                        $content.append($elem);
                        $name.append($("<p>").text(ItemsObjects[i].description));
                        $price.append($("<p>").text(ItemsObjects[i].price + " руб"));

                        $button.on("click", { name: $name.text(), price: $price.text() }, buttonOnZap);
                    }
                }
                $("main .content").append($content);

            } else if ($element.parent().is(":nth-child(2)")) {

                $content = $("<div>");
                $content.addClass("content_items");
                for (var i = 0; i < ItemsObjects.length; i++) {
                    if(ItemsObjects[i].tags.includes("педикюр")){
                        var $elem = $("<div>"),
                            $name = $("<div>"),
                            $price = $("<div>"),
                            $button = $("<button>").text("Записаться");;
                        if(flag){
                            $button.hide();
                        }

                        $elem.addClass("content_items_item");
                        $name.addClass("content_items_item_name");
                        $price.addClass("content_items_item_price");
                        $button.addClass("content_items_item_button");

                        $elem.append($name);
                        $elem.append($price);
                        $elem.append($button);
                        if(flag) {
                            $elem.append(buttonOnRed(ItemsObjects[i], function(){
                                console.log("Услуга отредактирована");
                            }));
                            $elem.append(buttonOnDel(ItemsObjects[i], function(){
                                console.log("Услуга удалена");
                            }));
                        }
                        $content.append($elem);
                        $name.append($("<p>").text(ItemsObjects[i].description));
                        $price.append($("<p>").text(ItemsObjects[i].price + " руб"));

                        $button.on("click", { name: $name.text(), price: $price.text() }, buttonOnZap);
                    }
                }
                $("main .content").append($content);

            } else if ($element.parent().is(":nth-child(3)")) {

                $content = $("<div>");
                $content.addClass("content_items");
                for (var i = 0; i < ItemsObjects.length; i++) {
                    if(ItemsObjects[i].tags.includes("лечение")){
                        var $elem = $("<div>"),
                            $name = $("<div>"),
                            $price = $("<div>"),
                            $button = $("<button>").text("Записаться");
                        if(flag){
                            $button.hide();
                        }

                        $elem.addClass("content_items_item");
                        $name.addClass("content_items_item_name");
                        $price.addClass("content_items_item_price");
                        $button.addClass("content_items_item_button");

                        $elem.append($name);
                        $elem.append($price);
                        $elem.append($button);
                        if(flag) {
                            $elem.append(buttonOnRed(ItemsObjects[i], function(){
                                console.log("Услуга отредактирована");
                            }));
                            $elem.append(buttonOnDel(ItemsObjects[i], function(){
                                console.log("Услуга удалена");
                            }));
                        }
                        $content.append($elem);
                        $name.append($("<p>").text(ItemsObjects[i].description));
                        $price.append($("<p>").text(ItemsObjects[i].price + " руб"));

                        $button.on("click", { name: $name.text(), price: $price.text() }, buttonOnZap);
                    }
                }
                $("main .content").append($content);
            }
            return false;
        });
    });
    if(flag) $("main").append(() => {
        var div = $("<div>");
        div.addClass("container_admin");
        div.append(buttonOnAdd());
        return div;
    });
    $(".main_tabs_item:first-child span").trigger("click");
};

var buttonOnZap = function(event){
    var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Записаться"),
        $buttonCancle = $("<button>").text("Отмена"),
        $lableName = $("<label>").text("Введите ваше имя"),
        $lableFName = $("<label>").text("Введите вашу фамилию"),
        $lablePhone = $("<label>").text("Введите ваш телефон");
    $content.addClass("content_container_popup");
    $popup.addClass("content_popup");
    $buttonZap.addClass("content_popup_button");
    $buttonCancle.addClass("content_popup_button");

    $buttonZap.on("click", function() {
        var name = $(".content_popup_input_name").val(),
            Fname = $(".content_popup_input_Fname").val(),
            phone = $(".content_popup_input_phone").val();
        if (name !== null && name.trim() !== "" && Fname !== null && Fname.trim() !== "" && phone !== null && phone.trim() !== "") {
            if(phone.length === 11 && phone[0] === "8" && phone[1] === "9"){
                var newOrder = { 
                    "item": event.data.name,
                    "price": parseInt(event.data.price),
                    "ClientName": name,
                    "ClientFname": Fname,
                    "ClientPhone": phone,
                    "manager": null
                };
                $.post("orders", newOrder, function(result) {
                    console.log(result);
                }).done(function(responde) {
                    console.log(responde);
                    popUpHideWithSuccess();
                }).fail(function(jqXHR, textStatus, error) {
                    console.log(error);
                    if (jqXHR.status === 501) {
                        alert("Произошла ошибка!");
                    } else {
                        alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    }
                });
            }
            else alert("Номер должен быть в формате 89ХХХХХХХХХ!");
        }
    });

    $buttonCancle.on("click", popUpHideWithCancle);
    $popup.append($lableName);
    $popup.append($("<input>").addClass("content_popup_input_name"));
    $popup.append($lableFName);
    $popup.append($("<input>").addClass("content_popup_input_Fname"));
    $popup.append($lablePhone);
    $popup.append($("<input>").addClass("content_popup_input_phone"));
    
    $popup.append($buttonZap);
    $popup.append($buttonCancle);
    $content.append($popup);
    $("main").append($content);
}

var buttonOnRed = function(item, callback) {
    var $buttonRed = $("<button>").attr("href", "items/" + item._id);
    $buttonRed.addClass("content_order_items_item_button");
    $buttonRed.text("Редактировать");

    $buttonRed.on("click", function() {
        var newItemName = prompt("Введите новое название услуги", item.description);
        var newItemPrice = prompt("Введите новую цену услуги", item.price);
        var newItemTags = prompt("Введите новые теги услуги через запятую", item.tags);
        var Tags = newItemTags.split(",");
        while(true){
            var flagTag = true;
            for(var i = 0; i < Tags.length; i++) {
                Tags[i] = Tags[i].trim();
                if(Tags[i] === "") Tags.splice(i, 1);

                if(Tags[i] === "маникюр" || Tags[i] === "педикюр" || Tags[i] === "лечение") ;
                else flagTag = false;
            }
            if(flagTag) break;
            else {
                alert("Введен недопустимый тег! Используйте теги: маникюр, педикюр и/или лечение!");
                Tags = prompt("Введите новые теги услуги через запятую", Tags).split(",");
            }
        }

        if(newItemName !== null && newItemName.trim() !== "" && 
            newItemPrice !== null && newItemPrice.trim() !== "" &&
            newItemTags !== null && newItemTags.trim() !== ""){
                $.ajax({
                    "url": "/items/" + item._id,
                    "type": "PUT",
                    "data": { "description": newItemName, "price": parseInt(newItemPrice), "tags": Tags }
                }).done(function(responde) {
                    callback();
                }).fail(function(err) {
                    console.log("Произошла ошибка: " + err);
                });
                location.reload();
                return false;
        }
        else{
            alert("Ошибка! Попробуйте снова!");
        }
    });
    return $buttonRed;
}

var buttonOnDel = function(item, callback) {
    var $buttonDel = $("<button>").attr("href", "items/" + item._id);
    $buttonDel.addClass("content_order_items_item_button");
    $buttonDel.text("Удалить");

    $buttonDel.on("click", function() {
        if (confirm("Вы уверены, что хотете удалить услугу \"" + item.description + "\"?")) {
            $.ajax({
                'url': '/items/' + item._id,
                'type': 'DELETE',
            }).done(function(responde) {
                console.log(responde);
            }).fail(function(jqXHR, textStatus, error) {
                console.log(error);
                alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
            });
        }
        location.reload();
        return false;
    });

    return $buttonDel;
}

var buttonOnAdd = () => {
    var $buttonAdd = $("<button>").text("Добавить новую услугу");
    $buttonAdd.addClass("content_admin_button");

    $buttonAdd.on("click", () => {
        var newItemName = prompt("Введите название услуги", "");
        var newItemPrice = prompt("Введите цену услуги", "");
        var newItemTags = prompt("Введите теги услуги через запятую", "");
        var Tags = newItemTags.split(",");
        while(true){
            var flagTag = true;
            for(var i = 0; i < Tags.length; i++) {
                Tags[i] = Tags[i].trim();
                if(Tags[i] === "") Tags.splice(i, 1);

                if(Tags[i] === "маникюр" || Tags[i] === "педикюр" || Tags[i] === "лечение") ;
                else flagTag = false;
            }
            if(flagTag) break;
            else {
                alert("Введен недопустимый тег! Используйте теги: маникюр, педикюр и/или лечение!");
                Tags = prompt("Введите новые теги услуги через запятую", Tags).split(",");
            }
        }

        if(newItemName !== null && newItemName.trim() !== "" &&
            newItemPrice !== null && newItemPrice.trim() !== "" &&
            newItemTags !== null && newItemTags.trim() !== ""){
                $.ajax({
                    "url": "/items/",
                    "type": "POST",
                    "data": { "description": newItemName, "price": parseInt(newItemPrice), "tags": Tags }
                }).done(function(responde) {
                    callback();
                    alert(responde);
                }).fail(function(jqXHR, textStatus, error) {
                    console.log("Произошла ошибка: " + error);
                    if (jqXHR.status === 501) {
                        alert("Такая услуга уже существует!");
                    } else {
                        alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    }
                });
        }
        else{
            alert("Необходимо заполнить все поля!");
        }
        location.reload();
        return false;
    });

    return $buttonAdd;
}


function popUpHideWithCancle(){
    $(".content_container_popup").hide();
}

function popUpHideWithSuccess(){
    $(".content_popup").empty();
    $(".content_popup").append($("<label>").addClass("sucscess").text("Успешно!"));
    setTimeout(() => {
        $(".content_container_popup").hide();
    }, 3000);
};

$(document).ready(function() {
    $.getJSON("items.json", function(ItemsObjects) {
        if(location.href.split("/")[4] === "admin") {
            var flag = true;
            $('.header_nav_item').each(function() {
                if($(this).attr('href') === "./faq.html") {
                    $(this).attr('href', "./admin.html");
                    $(this).text("Админ. страница");
                }
                else if($(this).attr('href') === "./support.html") {
                    $(this).attr('href', "./index.html");
                    $(this).text("Все услуги");
                }
                else if($(this).attr('href') === "./reg.html") {
                    $(this).attr('href', "/reg.html");
                    $(this).text("Выйти");
                }
            });
        }
        main(ItemsObjects, flag);
    });
});