import { WebSocketServer } from "ws";
import WebSocket from "ws";


const PORT = 4000;


const wss  =  new WebSocketServer( {
    port : PORT
} )


const ROOM: Map< string , WebSocket[] > = new Map();


wss.on("connection" , ( ws )=>{
    console.log("New connection request");
        ws.on("message",(  data   )=>{
            const parsedata =  JSON.parse( data.toString()  );
            if( parsedata.type ===  "join-room"){
                const room: string  = parsedata.room;
                if( !ROOM.has( room ))
                {
                    ROOM.set( room ,[]);
                }
            
            ROOM.get( room )!.push( ws );
            console.log( ROOM.get( room )?.length )
            }
            if( parsedata.type === "chat" )
            {
                const room =  parsedata.room;
                ROOM.get( room )?.filter( ( socket )=>{
                    return socket !== ws;
                }).forEach( socket =>
                    socket.send( parsedata.message )
                )

            }

        }
    )
    })


