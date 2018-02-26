import { UniqueIdGenerator } from './../../providers/id/UniqueIdGenerator';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Book } from '../../models/Book';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from "../home/home";

/**
 * Generated class for the AddBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-book',
  templateUrl: 'add-book.html',
})
export class AddBookPage {
  book = {} as Book;
  constructor(private afAuth: AngularFireAuth, private afDatabase : AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

async addBook(){
  try{
    
    const result = await this.afAuth.authState.take(1).subscribe(auth =>{
      this.book.author = auth.uid;
      this.book.id = UniqueIdGenerator.generate();
      this.afDatabase.list(`book`).push(this.book).then(()=>{
        this.navCtrl.setRoot(HomePage);
      })
    });
  }catch(e){
    console.error(e);
  }
}

}
