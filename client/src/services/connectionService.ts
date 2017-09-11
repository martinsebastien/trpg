import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { UserService } from './userService';

@Injectable()
export class ConnectionService {
    sessionId: string;
    navCtrl: any;
    nextScreen: any;
    me: any;

    constructor(
        public alertCtrl: AlertController,
        public userService: UserService
    ) { }

    initConnection(socket, nav, nextScreen) {
        this.navCtrl = nav;
        this.nextScreen = nextScreen;
        this.getSessionId(socket)
        this.onDisconnected(socket)
        this.onSuccessLogin(socket)
        this.onFailLogin(socket)
    }

    getSessionId(socket) {
        socket.on('SERVER_SESSION_ID', (data) => {
            this.sessionId = data;
        })
    }

    signIn(socket, data) {
        socket.emit('CLIENT_AUTH_REQUEST', data);
    }

    onDisconnected(socket) {
        socket.on('SERVER_DISCONNECT_CLIENT', () => {
            let alert = this.alertCtrl.create({
                title: 'Disconnected',
                subTitle: 'You have been disconnected',
                buttons: ['OK']
            });
            alert.present();
        })
    }

    onSuccessLogin(socket) {
        socket.on('SERVER_SUCCESS_LOGIN', (data) => {
            this.me = this.userService.initUser(data)
            let alert = this.alertCtrl.create({
                title: 'Success!',
                subTitle: 'You have been successfully connected!',
                buttons: ['OK']
            });
            alert.present();
            this.navCtrl.push(this.nextScreen);
        })
    }

    onFailLogin(socket) {
        socket.on('SERVER_FAIL_LOGIN', () => {
            let alert = this.alertCtrl.create({
                title: 'Fail!',
                subTitle: 'You entered a wrong username or password',
                buttons: ['OK']
            });
            alert.present();
        })
    }
}