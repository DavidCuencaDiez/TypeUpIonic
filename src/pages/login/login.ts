import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }

 Login(){
     this.navCtrl.push(TabsPage)
 }
 Register(){
  this.navCtrl.push(RegisterPage)
 }

}