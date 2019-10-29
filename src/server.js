const net = require('net');

class ServerCache
{
    /**
    * Constructor
    *
    * @param host
    * @param port
    */    
    constructor(host, port, debug) {
        this.host = host;
        this.port = port;
        this.debug = debug;
        
        this.DB = {};        
        
        this.startDeamon();
    }
    
    
    
    /**
    * For begin start
    **/
    startDeamon(){
        this.server = net.createServer();
        console.log("Starting Cache.log deamon");        
        this.Socket();
    }
    
    
    /**
     * Socket
     */
    Socket(){        
        this.server.on('connection',socket => {
            console.log('new connection');
            
            let body = "";
            let sizePacket=0;
            let allBytesRead = 0;
            let allBytesWritten = 0;
            
            socket.on('data', data => {
                let bread = socket.bytesRead;
                let bwrite = socket.bytesWritten;
                
                if(this.debug){
                    console.log("Buffer", data);
                    console.log("String", data+"");
                }
                
                body += data;
                
                if (sizePacket == 0){               
                       sizePacket = body.split(" ",1)[0] || 0;
                }
                
                if (sizePacket == bread - allBytesRead) {
                    allBytesRead = bread;
                    allBytesWritten = bwrite;            
                    
                    sizePacket=0;
                    
                    this.Command(body, data =>{
                        body = '';
                        socket.write(data);
                    });
                }
            });
            
            socket.on('error', err => this.socketError);
            socket.on('drain', err => this.socketDrain);
            socket.on('end', err => this.socketEbd);
        });
        
        console.log(`listener ${this.host}:${this.port}`);        
        this.server.listen(this.port, this.host);
    }
        
    /**
     * socket event
     */
    socketError(data){
        console.log(`Error: ${data}`);
    }
    
    socketDrain(data){
        console.log(`Drain: ${data}`);
    }
    
    socketEnd(data){}
    
    /*
    * Controller Command
    **/
    
    Command(data, call){
        if(this.debug){
            console.log("Command parse", data);
        }
        
        let val = data.match(/^\d*\s+([a-z]{1,})\s*([a-z]{1,})*\s*[=]*\s*(.*)/) || [];
        
        if (val.length > 0){
            switch (val[1]){
                case 'set':
                    this.Set(val, d=>call(d));
                    break;
                case 'get':
                    this.Get(val, d=>call(d));
                    break;
                case 'show':
                    this.Show(d=>call(d));
                    break;
                case 'die':
                    this.Die(val, d=>call(d));
                    break;
                case 'del':
                    this.Del(val, d=>call(d));
                    break;
                default:
                    call('Command not found');
            }      
        } else {
            call('Command not correct');
        }
    }
    
    
    
    /**
     * Command Set
     *
     * @param array cmd
     * @callback
     */    
    Set(cmd, call){
        if(this.debug){
            console.log("set command", cmd);
        }
        
        if (cmd.lenght < 3){
            call('Error');
        } else {
            this.DB[cmd[2]]=cmd[3];
            console.log('Set',cmd[2]);
            call("OK");
        }
    }
    
    
    /**
     * Command Get
     *
     * @param array cmd
     * @callback
     */    
    Get(cmd, call){
        if(this.debug){
            console.log("get command", cmd);
        }
        
        if (cmd.lenght < 2){
            call('Error');
        }
        
        if (this.DB[cmd[2]] === undefined){
            call("undefined");
        } else {
            console.log('Get',cmd[2]);
            
            let l = this.DB[cmd[2]].length ;
            l=l+l.toString().length+1;
            call(l + " " +this.DB[cmd[2]]);
        }
    }
    
    
    
    /**
     * Command Show
     *
     * @callback
     */    
    Show(call){
        if(this.debug){
            console.log("show command");
        }
        
        let str = "";
        for (let db in this.DB){
            str += db+",";
        }
        
        str = str.slice(0,-1);
        let l = str.length;
        l=l+l.toString().length+1;
        
        call(l + " " +str);
    }
    
    /**
     * Command Die
     *
     * @callback
     */
    Die(cmd,call){
        if(this.debug){
            console.log("die command", cmd);
        }
        
        if (cmd.lenght < 3){
            call('Error');
        } else {
            setTimeout(()=>{
                delete this.DB[cmd[2]];
            }, cmd[3]);
            console.log('Die',cmd[2], cmd[3]);
            call("OK");
        }
    }
    
    /**
     * Command Del
     *
     * @callback
     */
    Del(cmd,call){
        if(this.debug){
            console.log("del command", cmd);
        }
        
        if (cmd.lenght < 2){
            call('Error');
        }
        
        if (this.DB[cmd[2]] === undefined){
            call("undefined");
        } else {
            console.log('Del',cmd[2]);
            delete this.DB[cmd[2]];
            call("OK");
        }
    }
}

module.exports = ServerCache;