import { BooksHome } from './../../models/booksHome';
import { Book } from './../../models/Book';
import { AddBookPage } from './../add-book/add-book';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";
import { Profile } from "../../models/profile";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  myBooks : Array<BooksHome> = [];  

  constructor(private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      
      try{
        afDatabase.list<Book>('book').valueChanges().subscribe(book =>{
          book.forEach(element => {
            afDatabase.object<Profile>(`profile/${element.author}`).valueChanges().subscribe(val =>{            
              const bookHome = {} as BooksHome;
              bookHome.author = element.author;
              bookHome.avatar = val.avatar;
              bookHome.cover = element.cover;
              bookHome.description = element.description;
              bookHome.title = element.title;
              bookHome.lastname = val.lastname;
              bookHome.name = val.name;
              console.log(bookHome);
              this.myBooks.push(bookHome);
            });
          });
        });
      }catch(e){
        console.error(e);      
      }
      
    }

  async addBook(){
    try{
      await this.navCtrl.push(AddBookPage);
    }catch(e){
      console.error(e);
    }    
  }

}
