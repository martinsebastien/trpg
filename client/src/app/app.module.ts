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
import { FriendRequestPopoverPage } from '../pages/friend-request-popover/friend-request-popover';

import { SocketService } from '../services/socketService';
import { MessageService } from '../services/messageService';
import { ConnectionService } from '../services/connectionService';
import { FriendService } from '../services/friendService';
import { FriendRequestService } from '../services/friendRequestService';
import { UserService } from '../services/userService';

import { ListUserComponent } from '../components/list-user/list-user';
import { MenuComponent } from '../components/menu/menu';
import { BackgroundHomeComponent } from '../components/background-home/background-home';
import { BackgroundLoginComponent } from '../components/background-login/background-login';
import { AddFriendComponent } from '../components/add-friend/add-friend';
import { PlayButtonComponent } from '../components/play-button/play-button';
import { FriendListComponent } from '../components/friend-list/friend-list';
import { FriendRequestsComponent } from '../components/friend-requests/friend-requests';
import { VerticalBackgroundComponent } from '../components/vertical-background/vertical-background';
import { MeStatusComponent } from '../components/me-status/me-status';
import { PlayerStatusComponent } from '../components/player-status/player-status';
import { NewsComponent } from '../components/news/news';
import { SocialComponent } from '../components/social/social';
import { DetailsFriendComponent } from '../components/details-friend/details-friend';
import { FriendComponent } from '../components/friend/friend';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    PlayPage,
    FriendRequestPopoverPage,
    ListUserComponent,
    MenuComponent,
    BackgroundHomeComponent,
    BackgroundLoginComponent,
    AddFriendComponent,
    PlayButtonComponent,
    FriendListComponent,
    FriendRequestsComponent,
    VerticalBackgroundComponent,
    MeStatusComponent,
    PlayerStatusComponent,
    NewsComponent,
    SocialComponent,
    DetailsFriendComponent,
    FriendComponent
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
    PlayPage,
    FriendRequestPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocketService,
    MessageService,
    ConnectionService,
    FriendService,
    FriendRequestService,
    UserService,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
