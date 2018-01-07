import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from "../../models/post";

@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
})
export class EditPostPage {

  post: Post;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

  }

  ionViewWillLoad() {
    this.post = this.navParams.get('post');
  }

  updatePost(post: Post) {
    console.log('Post redigeres her');
    this.navCtrl.pop();
  }

}
