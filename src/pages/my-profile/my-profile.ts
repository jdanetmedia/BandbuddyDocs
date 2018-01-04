import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { storage, User} from "firebase";
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from "../../models/profile";
import { AngularFireDatabase } from "angularfire2/database";
import { Camera, CameraOptions } from "@ionic-native/camera";

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
              private toast: ToastController,
              private camera: Camera) {
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

  async takeProfilePhoto() {
    try {
      // Camera options
      const options: CameraOptions = {
        targetWidth: 600,
        targetHeight: 600,
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        cameraDirection: 1
      }
      const result = await this.camera.getPicture(options);

      const image = `data:image/jpeg;base64,${result}`;

      // const pictures = storage().ref('pictures/profilbillede');
      const pictures = storage().ref(`/profilbilleder/profil-${this.user.uid}`);
      pictures.putString(image, 'data_url');
      this.profile.avatar = image;
    }
    catch(e) {
      console.error(e);
    }
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
