var main = function(ManagersObjects) {
    "use strict";

    var $content = $("<div>");
    $content.addClass("content_order_items");
    for (var i = 0; i < ManagersObjects.length; i++) {
        if(ManagersObjects[i].login !== location.href.split('/')[4]){
            var $elem = $("<div>"),
            $name = $("<div>"),
            $client = $("<div>"),
            $manager = $("<div>"),
            $buttonRed = $("<button>").text("Редактировать"),
            $buttonAdd = $("<button>").text("Добавить нового пользователя");

            $elem.addClass("content_order_items_item");
            $name.addClass("content_order_items_item_name");
            $client.addClass("content_order_items_item_client");
            $manager.addClass("content_order_items_item_manager");
            $buttonRed.addClass("content_order_items_item_button");
            $buttonAdd.addClass("content_admin_button");

            $elem.append($name);
            $elem.append($client);
            $elem.append($manager);
            $content.append($elem);
            $name.append($("<p>").text(ManagersObjects[i].login));
            $client.append($("<p>").text(ManagersObjects[i].role));
            $manager.append($buttonRed);
            $buttonRed.on("click", { flagRed: true, obj: ManagersObjects[i] }, buttonOnZap);
            $buttonAdd.on("click", { flagRed: false, obj: ManagersObjects[i] }, buttonOnZap);
            $manager.append(DelManager(ManagersObjects[i], function(){
                console.log("Менеджер удален");
            }));
        }
    }
    $("main .content").append($content);
    $("main .container_admin").append($buttonAdd);
};

var DelManager = function(manager, callback) {
    var $buttonDel = $("<button>").attr("href", "managers/" + manager.login);
    $buttonDel.addClass("content_order_items_item_button");
    $buttonDel.text("Удалить");

    $buttonDel.on("click", function() {
        if (confirm("Вы уверены, что хотете удалить работника " + manager.login + "?")) {
            $.ajax({
                'url': '/managers/' + manager.login,
                'type': 'DELETE',
            }).done(function(responde) {
                console.log(responde);
                alert('Менеджер успешно удален');
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

var CreateNew = function(){
    var $buttonAdd = $("<button>").text("Добавить нового работника");
    $buttonAdd.addClass("content_admin_button");

    $buttonAdd.on("click", () => {
        var newManagerLogin = prompt("Введите логин менеджера", "");
        var newManagerRole = prompt("Введите роль менеджера", "");
        if(newManagerLogin !== null && newManagerLogin.trim() !== ""){
            if(newManagerRole === "admin" || newManagerRole === "manager"){
                $.ajax({
                    "url": "/managers/",
                    "type": "POST",
                    "data": { "login": newManagerLogin, "role": newManagerRole }
                }).done(function(responde) {
                    callback();
                    alert(responde);
                }).fail(function(jqXHR, textStatus, error) {
                    console.log("Произошла ошибка: " + error);
                    if (jqXHR.status === 501) {
                        alert("Такой менеджер уже существует!\nИзмените логин и повторите " +
                            "попытку");
                    } else {
                        alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    }
                });
            }
            else{
                alert("Недопустимый логин и/или роль!");    
            }
        }
        else{
            alert("Недопустимый логин и/или роль!");
        }
        location.reload();
        return false;
    });

    return $buttonAdd;
}

var buttonOnZap = function(event){
    var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Редактировать"),
        $buttonCancle = $("<button>").text("Отмена");
    if(event.data.flagRed){
        var $lableName = $("<label>").text("Введите новый логин"),
        $lableFName = $("<label>").text("Введите новую роль");
    }
    else {
        var $lableName = $("<label>").text("Введите логин"),
        $lableFName = $("<label>").text("Введите роль");
        $buttonZap.text("Добавить");
    }
    $content.addClass("content_container_popup");
    $popup.addClass("content_popup");
    $buttonZap.addClass("content_popup_button");
    $buttonCancle.addClass("content_popup_button");

    $buttonZap.on("click", function() {
        var name = $(".content_popup_input_name").val(),
            Fname = $(".content_popup_input_Fname").val();
        if (name !== null && name.trim() !== "" && Fname !== null && Fname.trim() !== "") {
            if(Fname === "admin" || Fname === "manager"){
                if(event.data.flagRed){
                    $.ajax({
                        "url": "/managers/" + event.data.obj.login,
                        "type": "PUT",
                        "data": { "login": name, "role": Fname },
                        success: function (response) {
                            popUpHideWithSuccess();
                       },
                       error: function(responde){
                           alert("error");
                       }
                    }).done(function(responde) {
                        // callback();
                        console.log(responde);
                    }).fail(function(err) {
                        console.log("Произошла ошибка: " + err);
                    });
                    return false;
                } else {
                    $.ajax({
                        "url": "/managers/",
                        "type": "POST",
                        "data": { "login": name, "role": Fname },
                        success: function (response) {
                            popUpHideWithSuccess();
                       }
                    }).done(function(responde) {
                        console.log(responde);
                    }).fail(function(jqXHR, textStatus, error) {
                        console.log("Произошла ошибка: " + error);
                        if (jqXHR.status === 501) {
                            alert("Такой менеджер уже существует!\nИзмените логин и повторите " +
                                "попытку");
                        } else {
                            alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                        }
                    });
                    return false;
                }
            }
            else{
                alert("Недопустимый логин и/или роль!");    
            }
        }
    });

    $buttonCancle.on("click", popUpHideWithCancle);
    if(event.data.flagRed) {
        $popup.append($lableName);
        $popup.append($("<input>").val(event.data.obj.login).addClass("content_popup_input_name"));
        $popup.append($lableFName);
        $popup.append($("<input>").val(event.data.obj.role).addClass("content_popup_input_Fname"));
    }
    else {
        $popup.append($lableName);
        $popup.append($("<input>").addClass("content_popup_input_name"));
        $popup.append($lableFName);
        $popup.append($("<input>").addClass("content_popup_input_Fname"));
    }
    
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
        location.reload();
        $(".content_container_popup").hide();
    }, 3000);
};

$(document).ready(function() {
    $.getJSON("managers.json", function(ManagersObjects) {
        main(ManagersObjects);
    });
});