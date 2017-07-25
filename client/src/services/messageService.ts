import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class MessageService {
    messages: any[] = [];

    sendMessage(socket, message) {
        socket.emit('new message', message);
    }

    getMessages(socket) {
        socket.on('chat message', (data) => {
            this.messages.push(data);
        });
    }
}