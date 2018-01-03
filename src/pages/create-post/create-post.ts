import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from "../../models/post";
import { AngularFireDatabase } from "angularfire2/database";
import { User, storage } from "firebase";
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from "../../models/profile";
import { Camera, CameraOptions } from "@ionic-native/camera";
import {Time} from "@angular/common";

@IonicPage()
@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html',
})
export class CreatePostPage {

  post = {} as Post;
  user = {} as User;
  profile: Profile;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public database: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              private camera: Camera) {
    afAuth.authState.subscribe((user: User) => {
      this.user = user;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePostPage');

    this.database.object(`/profiles/${this.user.uid}`).valueChanges().subscribe((profile: Profile) => {
      this.profile = profile;
    });

    console.log(this.profile);
  }

  createPost(post: Post) {
    post.author = this.user.uid;
    post.authorName = this.profile.fName;
    post.date = new Date().toDateString();
    const itemsRef = this.database.list('posts');
    itemsRef.push(post);
    this.navCtrl.pop();
    this.post.postContent = '';
  }

  async takePhoto() {
    try {
      // Camera options
      const options: CameraOptions = {
        quality: 50,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      const result = this.camera.getPicture(options);

      const image = `data:image/jpeg:base64,${result}`;

      const pictures = storage().ref(`/pictures/${new Time()}`);
      pictures.putString(image, 'data_url');
    }
    catch(e) {
      console.error(e);
    }
  }

}
