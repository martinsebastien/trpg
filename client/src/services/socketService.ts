import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class SocketService {
    private url = 'http://localhost:3000';
    private socket;

    server() {
        this.socket = io.connect(this.url);
        return this.socket;
    }
}