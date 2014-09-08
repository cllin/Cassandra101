
module.exports = {

    selectAll: function(response) {
        var client = getCQLClient();
        
        client.execute('SELECT * FROM users', [],
                       function(err, result) {
                       var text = 'execute failed';
                       if (!err) {
                       text = resultToJSON(result);
                       }
                       
                       sendResponse(err, response, text);
                       });
    },
    
    insert: function(request, response) {
        var client = getCQLClient();
        
        var user_name = request.user_name;
        var phone_number = request.phone_number;
        var address = request.address;
        
        client.execute('INSERT INTO users (user_name, phone_number, address) VALUES (?, ?, ?);',
                       [user_name, phone_number, address],
                       function(err, result) {
                       sendResponse(err, response, 'Values inserted!');
                       });
    },
    
    clearAll: function (response) {
        var client = getCQLClient();
        
        client.execute('TRUNCATE users;', [],
                       function(err, result) {
                       sendResponse(err, response, response);
                       });
    }
};

function getCQLClient() {
    var cql = require('node-cassandra-cql');
    var client = new cql.Client({hosts: ['127.0.0.1:9042'],
                                keyspace: 'cassandra101',
                                username: 'cassandra',
                                password: 'cassandra'});
    return client;
}

function sendResponse(err, response, text) {
    if (err) {
        text = 'execute failed';
    }
    
    response.writeHead(200, {
                       'Content-Type': 'text/plain',
                       'Access-Control-Allow-Origin' : '*',
                       'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                       });
    
    response.end(text + '\r\n');
}

function resultToJSON(result) {
    var resultJSON = '';
    resultJSON += '{"users":[';
    var arrayLength = result.rows.length;
    for (var i = 0; i < arrayLength; i++) {
        var user = result.rows[i];
        
        resultJSON += '{'
        resultJSON += '"user_name":"' + user.user_name + '", ';
        resultJSON += '"phone_number":"' + user.phone_number + '", ';
        resultJSON += '"address":"' + user.address + '"';
        resultJSON += '}';
        
        if (i != arrayLength - 1) {
            resultJSON += ',';
        }
    }
    resultJSON += ']}';
    return resultJSON;
}
