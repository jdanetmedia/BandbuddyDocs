import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { User } from "firebase";
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from "../../models/profile";
import { AngularFireDatabase } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  user = {} as User;
  profile = {} as Profile;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public database: AngularFireDatabase,
              private toast: ToastController) {
    afAuth.authState.subscribe((user: User) => {
      this.user = user;
      this.database.object(`/profiles/${this.user.uid}`).valueChanges().subscribe((profile: Profile) => {
        if(profile != null) {
          this.profile = profile;
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  updateProfile(profile: Profile) {
    const profileRef = this.database.object(`/profiles/${this.user.uid}`);
    profileRef.update(profile);
    let toast = this.toast.create({
      message: 'Profil opdateret',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

}
