import Dexie, {EntityTable} from 'dexie';
import {SocketConfig} from "./SocketConfig.ts";

export const db = new Dexie('SocketsDB') as Dexie & {
    sockets: EntityTable<
        SocketConfig,
        'id'>;
};

db.version(1).stores({
    sockets: '++id, name, stomp, sockjs, ws'
});

export type {SocketConfig};
