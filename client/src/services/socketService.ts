import * as io from 'socket.io-client';

export class SocketService {
    private url = 'http://localhost:3000';
    public socket;

    server() {
        this.socket = io.connect(this.url);
        return this.socket;
    }
}