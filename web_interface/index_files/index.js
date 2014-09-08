function insert() {
    var user_name = document.getElementById("user_name").value;
    var phone_number = document.getElementById("phone_number").value;
    var address = document.getElementById("address").value;
    
//  Show error message if any field is empty
    if (!user_name || !phone_number || !address) {
        alert("Values cannot be empty");
        return;
    }
    
    user_name.replace(' ', '%20');
    phone_number.replace(' ', '%20');
    address.replace(' ', '%20');
    
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET",
                 'http://127.0.0.1:8000/insert?user_name=' + user_name +
                 '&phone_number=' + phone_number + '&address=' + address, false);
    xmlHttp.send(null);
    
    alert(xmlHttp.responseText);
}

function printTable() {
    document.getElementById("table").innerHTML = '';
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://127.0.0.1:8000/select_all', false);
    xmlHttp.send(null);
    
    var users = JSON.parse(xmlHttp.responseText).users;
    
    if (users.length == 0) {
        document.getElementById("table").innerHTML = 'Empty table';
        return;
    }
    
    buildHtmlTable(users);
}

function clearTable() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://127.0.0.1:8000/clear_all', false);
    xmlHttp.send(null);
}

function buildHtmlTable(list) {
    var columns = addAllColumnHeaders(list);
    
    for (var i = 0; i < list.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = list[i][columns[colIndex]];
            
            if (cellValue == null) cellValue = '';
            row$.append($('<td/>').html(cellValue));
        }
        
        $("#table").append(row$);
    }
}

function addAllColumnHeaders(list) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');
    
    for (var i = 0; i < list.length; i++) {
        var rowHash = list[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1){
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }

    $("#table").append(headerTr$);
    
    return columnSet;
}