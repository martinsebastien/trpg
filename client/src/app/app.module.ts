import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { SocketService } from '../services/socketService';
import { MessageService } from '../services/messageService';
import { ConnectionService } from '../services/connectionService';
import { ListUserComponent } from '../components/list-user/list-user';
import { MenuComponent } from '../components/menu/menu';
import { BackgroundHomeComponent } from '../components/background-home/background-home';
import { BackgroundLoginComponent } from '../components/background-login/background-login';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListUserComponent,
    MenuComponent,
    BackgroundHomeComponent,
    BackgroundLoginComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocketService,
    MessageService,
    ConnectionService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
