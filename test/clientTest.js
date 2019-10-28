const net = require('net');

var client = new net.Socket();
client.connect(3000, '127.0.0.1', function() {
	console.log('Connected');
    
    // set foo=var
	setTimeout(d=>client.write(set("foo","bar")),1000);
    
    // set foo=var
	setTimeout(d=>client.write(set("car","ford")),2000);
    
    //get foo
    setTimeout(d=>client.write(get("foo")),3000);
    
    //show
    setTimeout(d=>client.write(show()),4000);
    
    //del
    setTimeout(d=>client.write(del("foo")),5000);
    
    //show
    setTimeout(d=>client.write(show()),6000);
    
    //die
    setTimeout(d=>client.write(die("car",3)),7000);
    
    //show
    setTimeout(d=>client.write(show()),10000);
    
    //disconnect
    setTimeout(d=>client.destroy(),11000);
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
    let l = cmd.length + 1;
    l += l.toString().length;
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

function del(key){
    return query(`del ${key}`);
}

function die(key, value){
    return query(`die ${key}=${value}`);
}