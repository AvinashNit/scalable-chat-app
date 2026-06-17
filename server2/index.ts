import { WebSocketServer } from "ws";
import WebSocket from "ws";


const PORT = 4001;


const relay  =  new WebSocket( "ws://localhost:8000" )
relay.on("open",()=> console.log("connection established to relay"))

relay.on( "message", ( data )=>{
    const parseData = JSON.parse( data.toString() );
    console.log("server2 got " + parseData.message )
    ROOM.get(parseData.room)?.forEach( client => client.send( parseData.message ));
})



const wss  =  new WebSocketServer( {
    port : PORT
} )

wss.on("listening",()=> console.log("server2 running over 4001"))

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
            else
            {
                console.log("sending to relay")
                relay.send( data );
            }
                
        }
    )
    })


