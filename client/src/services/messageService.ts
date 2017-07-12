import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class MessageService {

    sendMessage(socket, message) {
        socket.emit('new message', message);
    }

    getMessages(socket) {
        let observable = new Observable(observer => {
            socket.on('chat message', (data) => {
                observer.next(data);
            });
        })
        return observable;
    }
}