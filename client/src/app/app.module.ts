import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { PlayPage } from '../pages/play/play';

import { SocketService } from '../services/socketService';
import { MessageService } from '../services/messageService';
import { ConnectionService } from '../services/connectionService';
import { FriendService } from '../services/friendService';
import { UserService } from '../services/userService';

import { ListUserComponent } from '../components/list-user/list-user';
import { MenuComponent } from '../components/menu/menu';
import { BackgroundHomeComponent } from '../components/background-home/background-home';
import { BackgroundLoginComponent } from '../components/background-login/background-login';
import { AddFriendComponent } from '../components/add-friend/add-friend';
import { PlayButtonComponent } from '../components/play-button/play-button';
import { FriendListComponent } from '../components/friend-list/friend-list';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    PlayPage,
    ListUserComponent,
    MenuComponent,
    BackgroundHomeComponent,
    BackgroundLoginComponent,
    AddFriendComponent,
    PlayButtonComponent,
    FriendListComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    PlayPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocketService,
    MessageService,
    ConnectionService,
    FriendService,
    UserService,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
