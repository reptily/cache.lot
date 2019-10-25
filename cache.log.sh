#!/usr/bin/node

const Help = require("./src/help.js");
const Server = require("./src/server.js");

let HOST = "127.0.0.1";
let PORT = "3000";

/**
* Print help information
*/

if (process.argv[2] == "-h" || process.argv[2] == "--help"){
    Help.forEach( v => console.log(v));
}


/**
* Print version programm
*/

if (process.argv[2] == "-v" || process.argv[2] == "--version"){
    console.log("Cache.log ver.: 1.0");
}

if (process.argv[2] != undefined){
    
    
    /**
    * Set settings host
    */    
    cmd = process.argv[2].match(/^--host=(.*)/i) || [];
    if(cmd.length >= 2){
        HOST = cmd[1];
    }
    
    
    /**
    * Set settings port
    */ 
    cmd = process.argv[2].match(/^--port=(.*)/i) || [];
    if(cmd.length >= 2){
        PORT = cmd[1];
    }
}

/*
* Start Server!!!
*/
new Server(HOST, PORT);