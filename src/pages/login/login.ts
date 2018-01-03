import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "firebase";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    this.navCtrl.setRoot(HomePage);
  }

  register(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

}
