import {db} from '../models/db.ts';
import {SocketConfig} from "../models/db.ts";

export const testDb = async () => {
    const exampleSocketConfig: SocketConfig = {
        id: 1,
        url: 'ws://example.com',
        connected: false,
        name: 'Example Socket',
        stomp: true,
        sockjs: true,
    }


    await db.sockets.add(exampleSocketConfig);

    return db.sockets.get(1);
}