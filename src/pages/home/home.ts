import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreatePostPage } from "../create-post/create-post";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import { User } from "firebase";
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from "../../models/profile";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: User;
  posts: Observable<any[]>;

  constructor(public navCtrl: NavController,
              public database: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
    this.posts = database.list('posts').valueChanges();
    afAuth.authState.subscribe((user: User) => {
      this.user = user;
    });
  }

  toCreatePostPage() {
    this.navCtrl.push(CreatePostPage);
  }

}
