const net = require('net');

var client = new net.Socket();
client.connect(3000, '127.0.0.1', function() {
	console.log('Connected');
    
    // set foo=var
	setTimeout(d=>client.write(set("foo","bar")),1000);
    
    //get foo
    setTimeout(d=>client.write(get("foo")),2000);
    
    //show
    setTimeout(d=>client.write(show()),3000);
    
    //disconnect
    setTimeout(d=>client.destroy(),4000);
});

client.on('data', function(data) {
	console.log('Received: ' + data);
});

client.on('close', function() {
	console.log('Connection closed');
});

/*
* function
*/

function query(cmd){
    let l = cmd.length;
    l+=l.toString().length+1;
    cmd = l+" "+cmd;
    console.log(cmd);
    
    return cmd;
}

function set(key, value){
    return query(`set ${key}=${value}`);
}

function get(key){
    return query(`get ${key}`);
}

function show(){
    return query(`show`);
}