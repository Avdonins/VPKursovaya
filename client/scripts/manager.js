var main = function(ManagersObjects) {
    "use strict";
    var $butLogin = $('.content_items_item_button'),
    $input = $('.reg_input_name');

    $butLogin.on("click", function() {
        var login = $input.val();
        if (login !== null && login.trim() !== "") {
            var loginManager = { "login": login },
                flag,
                role;
            for (var i = 0; i < ManagersObjects.length; i++) {
                if(ManagersObjects[i].login === login) {
                    flag = true;
                    role = ManagersObjects[i].role;
                }
            }
            if(flag){
                if(role === "manager"){
                    $.ajax({
                    'url': '/managers/' + login,
                    'type': 'GET'
                }).done(function(responde) {
                    window.location.replace('managers/' + login + '/' + 'orderslist.html');
                }).fail(function(jqXHR, textStatus, error) {
                    console.log(error);
                    alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                });
                }
                else if(role === "admin"){
                    $.ajax({
                        'url': '/managers/' + login,
                        'type': 'GET'
                    }).done(function(responde) {
                        window.location.replace('managers/' + login + '/' + 'admin.html');
                    }).fail(function(jqXHR, textStatus, error) {
                        console.log(error);
                        alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    });
                }
            }
            else alert("Такого пользователя не найдено!");
        }
    });
}

$(document).ready(function() {
    $.getJSON("managers.json", function(ManagersObjects) {
        main(ManagersObjects);
    });
});