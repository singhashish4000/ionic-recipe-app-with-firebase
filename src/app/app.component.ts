import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private menuCtrl:MenuController,
    private authService: AuthService) {
    
      firebase.initializeApp({
        apiKey: "AIzaSyBN0kZJImxADxIDj-XpMS41C_x3Ye-x6hw",
        authDomain: "recipe-app-e83ec.firebaseapp.com",
        databaseURL: "https://recipe-app-e83ec.firebaseio.com",
        projectId: "recipe-app-e83ec",
        storageBucket: "recipe-app-e83ec.appspot.com",
        messagingSenderId: "613348659898"
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.isAuthenticated = true;
            this.nav.setRoot(this.tabsPage);
        } else {
          this.isAuthenticated = false;
          this.nav.setRoot(this.signinPage);
        }
      });

      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
    });
  }


  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogOut() {
    this.authService.logout();
    this.menuCtrl.close();
  }
}
