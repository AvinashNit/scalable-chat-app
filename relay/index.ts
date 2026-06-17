import  { WebSocketServer } from "ws";
import WebSocket from "ws";





const wss = new WebSocketServer({ port:8000 });

wss.on('listening', ()=>console.log("Relay running on 8000"))

wss.on("connection", (ws)=>{
    console.log("new Connection request");
    ws.on("message", ( data )=>{
        
        console.log(`relay got ${data.toString()}`);
            for( const client of wss.clients )
                {
                    
                    client.send( data );
                }        
    })
})