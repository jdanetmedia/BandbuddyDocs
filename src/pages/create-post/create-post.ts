import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from "../../models/post";
import { AngularFireDatabase } from "angularfire2/database";
import { User, storage } from "firebase";
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from "../../models/profile";
import { Camera, CameraOptions } from "@ionic-native/camera";

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
    this.profile.fName ? post.authorName = this.profile.fName : post.authorName = this.user.email;
    this.profile.avatar ? post.authorImage = this.profile.avatar : post.authorImage = null;
    post.id = `${this.user.uid}-${new Date().getTime()}`;
    post.date = new Date().toDateString();
    const itemsRef = this.database.list('posts');
    itemsRef.push(post);
    this.navCtrl.pop();
    this.post.postContent = '';
  }

  async takePhoto(post: Post) {
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
      const pictures = storage().ref(`/billeder/post-${this.user.uid}-${new Date().getTime()}`);
      pictures.putString(image, 'data_url');
      post.postImage = image;
    }
    catch(e) {
      console.error(e);
    }
  }

}
