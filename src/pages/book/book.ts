import { BooksHome } from './../../models/booksHome';
import { Profile } from './../../models/profile';
import { Book } from './../../models/Book';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  book = {} as BooksHome;
  addRemove: string;
  add :boolean;
  constructor(private afAuth: AngularFireAuth,private afDatabase : AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
    this.book = navParams.data;

  }

  addRemoveBook(){
    const book = {} as Book;
  }

}
