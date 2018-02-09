import { Book } from './../../models/Book';
import { AddBookPage } from './../add-book/add-book';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from '@firebase/util';

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

  booksRef: AngularFireList<any>;
  books: Observable<any[]>;
  

  constructor(private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      
      try{
       this.booksRef = afDatabase.list('book');        
       this.books = this.booksRef.snapshotChanges()
        .map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
        
      }catch(e){
        console.error(e);      
      }
      
    }

  async addBook(){
    console.log("hola")
    try{
      await this.navCtrl.push(AddBookPage);
    }catch(e){
      console.error(e);
    }    
  }

}
