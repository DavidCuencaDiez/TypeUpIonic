import { BookPage } from './../book/book';
import { BooksHome } from './../../models/booksHome';
import { Book } from './../../models/Book';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";
import { Profile } from "../../models/profile";
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  myBooks : Array<BooksHome> = [];
  constructor(private afAuth: AngularFireAuth,private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      
      try{
        this.afAuth.authState.take(1).subscribe(auth =>{
          afDatabase.database.ref(`bookcollection/${auth.uid}`).on('value', bc =>{
            this.myBooks = []
            const result = bc.val();            
            afDatabase.list<Book>('book').valueChanges().subscribe(book =>{
              book.forEach(element => {
                for(var b in result){
                  if(element.id === result[b]){                  
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
                      this.myBooks.push(bookHome);                      
                    });
                  }
                };
              });
            });              
          });
        });      
      }catch(e){
        console.error(e);      
      }
      
    }
  async goToBookProfile(book: any){
    console.log(book)  
    await this.navCtrl.push(BookPage,book);
  }
}
