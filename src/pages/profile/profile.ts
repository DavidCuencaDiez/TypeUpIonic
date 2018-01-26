import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  background;
  avatar;
  name;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.background = 'https://ionicframework.com/dist/preview-app/www/assets/img/card-saopaolo.png';
    this.avatar = 'https://png.icons8.com/color/1600/avatar.png';
    this.name = 'David Cuenca';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
