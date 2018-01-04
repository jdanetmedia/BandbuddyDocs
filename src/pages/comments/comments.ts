import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from "../../models/post";
import { PostComment } from "../../models/comment";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { User } from "firebase";
import {AngularFireAuth} from "angularfire2/auth";
import {Profile} from "../../models/profile";

@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  post = {} as Post;
  comment = {} as PostComment;
  comments: Observable<any[]>;
  user: User;
  profile: Profile;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public database: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user: User) => {
      this.user = user;
    });
  }

  ionViewDidLoad() {
    this.database.object(`/profiles/${this.user.uid}`).valueChanges().subscribe((profile: Profile) => {
      this.profile = profile;
    });
    this.post = this.navParams.get('post');
    this.comments = this.database.list('/comments', ref => ref.orderByChild('postID').equalTo(this.post.id)).valueChanges().map( (arr) => {
      return arr.reverse();
    });
  }

  postComment(comment: PostComment) {
    const itemsRef = this.database.list('comments');
    comment.postID = this.post.id;
    comment.commentAuthor = this.post.authorName;
    comment.commentDate = new Date().getTime().toString();
    this.profile.avatar ? comment.commentAuthorImage = this.profile.avatar : comment.commentAuthorImage = null;
    itemsRef.push(comment);
    this.comment.postComment = '';
  }

}
