var main = function(ItemsObjects, flag) {
    "use strict";

    var organizedByTag = tagOrg(ItemsObjects);
    organizedByTag.forEach((elem) => {
        $(".main_tabs").append($("<a class=\"main_tabs_item\" href=\"#\">").append($("<span class=\"active\">").text(elem.name)));
    });

    $(".main_tabs_item span").toArray().forEach(function(element) {
        $(element).on("click", function() {

            var $element = $(element),
                $content;

            $(".main_tabs_item span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            for(var i = 0; i < organizedByTag.length; i++){
                $content = $("<div>");
                $content.addClass("content_items");
                for(var j = 0; j < organizedByTag[i].items.length; j++){

                    if ($element.parent().is(":nth-child(" + (i + 1) + ")")) {
                        var $elem = $("<div>"),
                            $name = $("<div>"),
                            $price = $("<div>"),
                            $button = $("<button>").text("Записаться"),
                            $buttonR = $("<button>").text("Редактировать");
                        if(flag){
                            $button.hide();
                        }
                        $elem.addClass("content_items_item");
                        $name.addClass("content_items_item_name");
                        $price.addClass("content_items_item_price");
                        $button.addClass("content_items_item_button");

                        $buttonR.addClass("content_order_items_item_button");
                        // $buttonA.addClass("content_admin_button");

                        $elem.append($name);
                        $elem.append($price);
                        $elem.append($button);
                        if(flag) {
                            $elem.append($buttonR);
                            $elem.append(buttonOnDel(organizedByTag[i].id[j], organizedByTag[i].items[j], function(){
                                console.log("Услуга удалена");
                            }));
                        }
                        $content.append($elem);
                        $name.append($("<p>").text(organizedByTag[i].items[j]));
                        $price.append($("<p>").text(organizedByTag[i].price[j] + " руб"));

                        // console.log(ItemsObjects[i].prototype.includes(organizedByTag[i].id[j]))

                        $buttonR.on("click", { id: organizedByTag[i].id[j], desc: organizedByTag[i].items[j], price: organizedByTag[i].price[j], tags: ItemsObjects.find(item => item._id === organizedByTag[i].id[j]).tags }, buttonOnRed);
                        $button.on("click", { name: organizedByTag[i].items[j], price: organizedByTag[i].price[j] }, buttonOnZap);
                        
                        // console.log(ItemsObjects.find(item => item._id === organizedByTag[i].id[j]).tags);
                    }
                }
                $("main .content").append($content);
                // console.log(ItemsObjects).includes(organizedByTag[i].id[j]);
            }
        });
    });
    if(flag) $("main").append(() => {
        var div = $("<div>");
        var $buttonA = $("<button>").text("Добавить новую услугу");
        $buttonA.addClass("content_admin_button");
        div.addClass("container_admin");
        div.append($buttonA);

        $buttonA.on("click", buttonOnAdd);
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

var buttonOnRed = function(event) {
    var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Изменить"),
        $buttonCancle = $("<button>").text("Отмена"),
        $lableName = $("<label>").text("Введите новое название"),
        $lableFName = $("<label>").text("Введите новую цену"),
        $lablePhone = $("<label>").text("Введите новые теги через запятую");
    $content.addClass("content_container_popup");
    $popup.addClass("content_popup");
    $buttonZap.addClass("content_popup_button");
    $buttonCancle.addClass("content_popup_button");

    $buttonZap.on("click", function() {
        var name = $(".content_popup_input_name").val(),
            Fname = $(".content_popup_input_Fname").val(),
            phone = $(".content_popup_input_phone").val();
        if (name !== null && name.trim() !== "" && Fname !== null && Fname.trim() !== "" && phone !== null && phone.trim() !== "") {
            var Tags = phone.split(",");
        
            for(var i = 0; i < phone.length; i++) {
                phone[i] = phone[i].trim();
                if(phone[i] === "") phone.splice(i, 1);
            }
            
            $.ajax({
                "url": "/items/" + event.data.id,
                "type": "PUT",
                "data": { "desc": name, "price": parseInt(Fname), "tags": Tags }
            }).done(function(responde) {
                callback();
            }).fail(function(err) {
                console.log("Произошла ошибка: " + err);
            });
            location.reload();
            return false;
        }
    });

    $buttonCancle.on("click", popUpHideWithCancle);
    $popup.append($lableName);
    $popup.append($("<input>").val(event.data.desc).addClass("content_popup_input_name"));
    $popup.append($lableFName);
    $popup.append($("<input>").val(event.data.price).addClass("content_popup_input_Fname"));
    $popup.append($lablePhone);
    $popup.append($("<input>").val(event.data.tags).addClass("content_popup_input_phone"));
    
    $popup.append($buttonZap);
    $popup.append($buttonCancle);
    $content.append($popup);
    $("main").append($content);
}

var buttonOnDel = function(id, item, callback) {
    var $buttonDel = $("<button>").attr("href", "items/" + item._id);
    $buttonDel.addClass("content_order_items_item_button");
    $buttonDel.text("Удалить");

    $buttonDel.on("click", function() {
        if (confirm("Вы уверены, что хотите удалить услугу \"" + item + "\"?")) {
            $.ajax({
                'url': '/items/' + id,
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

    var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Добавить"),
        $buttonCancle = $("<button>").text("Отмена"),
        $lableName = $("<label>").text("Введите название"),
        $lableFName = $("<label>").text("Введите цену"),
        $lablePhone = $("<label>").text("Введите теги через запятую");
    $content.addClass("content_container_popup");
    $popup.addClass("content_popup");
    $buttonZap.addClass("content_popup_button");
    $buttonCancle.addClass("content_popup_button");

    $buttonZap.on("click", function() {
        var name = $(".content_popup_input_name").val(),
            Fname = $(".content_popup_input_Fname").val(),
            phone = $(".content_popup_input_phone").val();
        if (name !== null && name.trim() !== "" && Fname !== null && Fname.trim() !== "" && phone !== null && phone.trim() !== "") {
            var Tags = phone.split(",");
        
            for(var i = 0; i < phone.length; i++) {
                phone[i] = phone[i].trim();
                if(phone[i] === "") phone.splice(i, 1);
            }
            
            $.ajax({
                "url": "/items/",
                "type": "POST",
                "data": { "description": name, "price": parseInt(Fname), "tags": Tags }
            }).done(function(responde) {
                alert(responde);
            }).fail(function(jqXHR, textStatus, error) {
                console.log("Произошла ошибка: " + error);
                if (jqXHR.status === 501) {
                    alert("Такая услуга уже существует!");
                } else {
                    alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                }
            });

            location.reload();
            return false;
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

function popUpShow(){
    $(".content_container_popup").show();
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

var tagOrg = function(ItemsObjects) {
    var tagList = [],
        tagsObject = [];
    ItemsObjects.forEach(function(item) {
        item.tags.forEach(function(tag) {
            if (tagList.includes(tag)) {
                tagsObject[tagList.indexOf(tag)].id.push(item._id);
                tagsObject[tagList.indexOf(tag)].items.push(item.description);
                tagsObject[tagList.indexOf(tag)].price.push(item.price);
            } else {
                tagList.push(tag);
                tagsObject.push({ "name": tag, "id": [item._id], "items": [item.description], "price": [item.price] });
            }
        });
    });
    return tagsObject;
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