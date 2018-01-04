import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreatePostPage } from "../create-post/create-post";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import { User } from "firebase";
import { AngularFireAuth } from "angularfire2/auth";
import { CommentsPage } from "../comments/comments";
import { Post } from "../../models/post";

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
    afAuth.authState.subscribe((user: User) => {
      this.user = user;
    });
    this.posts = database.list('posts').valueChanges().map( (arr) => {
      return arr.reverse();
    });
  }

  toCreatePostPage() {
    this.navCtrl.push(CreatePostPage);
  }

  toCommentsPage(post: Post) {
    this.navCtrl.push(CommentsPage, {post: post});
  }

}
