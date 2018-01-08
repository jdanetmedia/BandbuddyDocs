import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from "../../models/post";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
})
export class EditPostPage {

  post: Post;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public database: AngularFireDatabase) {

  }

  ionViewWillLoad() {
    this.post = this.navParams.get('post');
  }

  updatePost(post: Post) {
    const itemsRef = this.database.list('posts');
    itemsRef.update(post.key, post);
    console.log('Post redigeres her');
    this.navCtrl.pop();
  }

}
