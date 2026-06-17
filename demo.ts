import { resolve } from "bun";
import WebSocket from "ws";



const ws = new WebSocket("ws://localhost8080");



ws.on( "open", ()=>{
    console.log("Connection established")
})


ws.on("message", ( data )=>{
    console.log( data.toString() );
})

function handleMessage()
{
    return new Promise((resolve, reject)=>{
        ws.on("message", (data)=>{
            resolve( data )
            //anything else that does handling of the resolve function and returns back
        })
    })
}


// i have to do certain things or other things after getting a message from server side 



async function somefunction(){
    // do other parts here
    read message
    //do next part upon the message type
}