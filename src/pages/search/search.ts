import { BooksHome } from './../../models/booksHome';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Book } from '../../models/Book';
import { Profile } from '../../models/profile';
import { BookPage } from '../book/book';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchTerm: string;
  booksRef: Array<BooksHome>;
  books: Array<BooksHome>;
  constructor(private afDatabase: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    afDatabase.list<Book>('book').valueChanges().subscribe(book =>{
      this.booksRef = []
      book.forEach(element => {                 
          afDatabase.object<Profile>(`profile/${element.author}`).valueChanges().subscribe(val =>{            
            const bookHome = {} as BooksHome;
            bookHome.id = element.id;
            bookHome.author = element.author;
            bookHome.avatar = val.avatar;
            bookHome.cover = element.cover;
            bookHome.description = element.description;
            bookHome.title = element.title;
            bookHome.lastname = val.lastname;
            bookHome.name = val.name;
            this.booksRef.push(bookHome);
          });
      });
    });    
  }

  async goToProfilePage(id : string){
    await this.navCtrl.push(ProfilePage,id);
  }
  async goToBookProfile(book: any){
    console.log(book)  
    await this.navCtrl.push(BookPage,book);
  }
  
  setFilteredItems(){
    this.books = this.booksRef.filter(b => {
      return (b.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 && this.searchTerm.length > 0);
    });
  }

}
