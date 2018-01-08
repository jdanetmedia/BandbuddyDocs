import { Component } from '@angular/core';
import { ActionSheetController, NavController, ToastController } from 'ionic-angular';
import { CreatePostPage } from "../create-post/create-post";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import { User } from "firebase";
import { AngularFireAuth } from "angularfire2/auth";
import { CommentsPage } from "../comments/comments";
import { Post } from "../../models/post";
import { EditPostPage } from "../edit-post/edit-post";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: User;
  posts: Observable<any[]>;

  constructor(public navCtrl: NavController,
              public database: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              public actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController) {
    afAuth.authState.subscribe((user: User) => {
      this.user = user;
    });
    //this.posts = database.list('posts').valueChanges().map( (arr) => {
    //  return arr.reverse();
    //});

    this.posts = database.list('posts').snapshotChanges().map( changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    }).map( (arr) => {
      return arr.reverse();
    });
  }

  toCreatePostPage() {
    this.navCtrl.push(CreatePostPage);
  }

  toCommentsPage(post: Post) {
    this.navCtrl.push(CommentsPage, {post: post});
  }

  postOptions(post: Post) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Rediger eller slet opslag?',
      buttons: [
        {
          text: 'Rediger opslag',
          handler: () => {
            this.navCtrl.push(EditPostPage, {post: post});
          }
        },{
          text: 'Slet opslag',
          role: 'destructive',
          handler: () => {
            const itemsRef = this.database.list('posts');
            itemsRef.remove(post.key);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
