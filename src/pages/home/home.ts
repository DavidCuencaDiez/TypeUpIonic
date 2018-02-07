import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  books: AngularFireList<any[]>;

  constructor(private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
    
      this.books = afDatabase.list('/books');
      
    }

  ionViewDidLoad() {
  }

}
