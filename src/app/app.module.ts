import { MyApp } from './app.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Firebase
import { FIREBASE_CONFIG } from "./firebase.config";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { CreatePostPage } from "../pages/create-post/create-post";
import { MyProfilePage } from "../pages/my-profile/my-profile";
import { CommentsPage } from "../pages/comments/comments";
import { EditPostPage } from "../pages/edit-post/edit-post";

import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage,
    CreatePostPage,
    MyProfilePage,
    CommentsPage,
    EditPostPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage,
    CreatePostPage,
    MyProfilePage,
    CommentsPage,
    EditPostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
