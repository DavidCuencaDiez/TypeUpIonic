import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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


}
