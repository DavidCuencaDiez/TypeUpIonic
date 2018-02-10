import { Book } from './../../models/Book';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ Profile } from '../../models/profile';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileInfo = {} as Profile;
  books : Array<Book>;
  categories = [];
  categoriesitems = [];
  constructor(private afDatabase: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    this.categoriesitems = [
      {name: 'Fiction'},
      {name: 'Thriller'},
      {name: 'Candemore'},
    ]

    try {
      afDatabase.object<Profile>(`profile/${navParams.data}`).valueChanges().subscribe(val =>{
          this.profileInfo = val;
      });

      afDatabase.list<Book>(`book`).valueChanges().subscribe(book =>{
        this.books = book.filter(val=>{
          return val.author === navParams.data;          
        });
      });
      
    } catch (e) {
      console.error(e);
    }
  }

  async goToBookProfile(book: Book){

    console.log(book);
    //await this.navCtrl.push()
  }
  
}
