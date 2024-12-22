export interface SocketConfig {
    id: number;
    url: string;
    name: string;
    stomp: boolean;
    sockjs: boolean;
    connected: boolean;
};