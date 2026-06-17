import { test, describe } from "bun:test"

const BACKEND_URL = "ws://localhost:4000";

function makeConnection( ws: WebSocket): Promise<void>
{
    return new Promise( ( resolve, reject )=>{
        ws.onopen = ()=>{
            resolve();
        }
        ws.onerror = ()=>{
            reject();
        }
    })
}

describe("Chat testing",()=>{

    test("message sent from one reaches to other participants in the room", async()=>{
            const ws1= new WebSocket(BACKEND_URL);
            const ws2 = new WebSocket(BACKEND_URL);

            await Promise.all([ makeConnection( ws1 ), makeConnection( ws2 )]);
            
            ws1.send(
                JSON.stringify({
                    type:"join-room",
                    room:"room1"
                })
            )

            ws2.send(
                JSON.stringify({
                    type:"join-room",
                    room:"room1"
                })
            )

            ws1.send(JSON.stringify({
                type:"chat",
                room:"room1",
                message:"HI From server 1"
            }))

            ws2.send(JSON.stringify({
                type:"chat", 
                room:"room1",
                message:"HI From server 2"
            }))
    })
} )