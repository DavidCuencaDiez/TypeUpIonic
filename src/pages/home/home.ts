import { BookPage } from './../book/book';
import { ProfilePage } from './../profile/profile';
import { BooksHome } from './../../models/booksHome';
import { Book } from './../../models/Book';
import { AddBookPage } from './../add-book/add-book';
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
          afDatabase.list(`bookcolletion/${auth.uid}`).valueChanges().subscribe(bc =>{
            bc.forEach(b =>{
              afDatabase.list<Book>('book').valueChanges().subscribe(book =>{
                book.forEach(element => {
                  if(element.id == b){                  
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
                });
              });
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
 async getAvatar(id){
   const result = await this.afDatabase.object<Profile>(`profile/${id}`);
   return result;
 }
  async goToProfilePage(id : string){
    await this.navCtrl.push(ProfilePage,id);
  }
  async goToBookProfile(book: any){
    console.log(book)  
    await this.navCtrl.push(BookPage,book);
  }
}
