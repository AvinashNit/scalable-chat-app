import { WebSocketServer } from "ws";
import WebSocket from "ws";


const PORT = 4000;


const wss  =  new WebSocketServer( {
    port : PORT
} )

const ROOM: Map< String , WebSocket[] > = new Map();


wss.on("connection" , ( ws )=>{
    console.log("New connection request");
    ROOM.set( "room1", [...ROOM.get("room1") ??  [], ws ]);
    ws.on("message" ,( data )=>{
        console.log(data);
        for( const client of wss.clients )
        {
            console.log(data.toString())
            client.send( data.toString() );
        }

        })
    })


