import { Book } from './../../models/Book';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AddBookPage } from './../add-book/add-book';
import { BookPage } from '../book/book';

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

  myProfile : boolean;

  constructor(private afAuth: AngularFireAuth,private afDatabase: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    this.categoriesitems = [
      {name: 'Fiction'},
      {name: 'Thriller'},
      {name: 'Candemore'},
    ]

    try {
      this.afAuth.authState.take(1).subscribe(auth =>{
        if( navParams.data === undefined  || auth.uid === navParams.data){
          this.myProfile = true;
        }else{
          this.myProfile = false;
        }
      })
    } catch (e) {
      
    }

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
      try {
        this.afAuth.authState.take(1).subscribe(auth =>{
          console.log(auth.uid);   
          afDatabase.object<Profile>(`profile/${auth.uid}`).valueChanges().subscribe(val =>{
            this.profileInfo = val;
          });
  
          afDatabase.list<Book>(`book`).valueChanges().subscribe(book =>{
            this.books = book.filter(val=>{
              return val.author === auth.uid;          
            });
          });
        });
      } catch (e) {
        console.error(e);
      }

    }
  }

  async addBook(){
    try{
      await this.navCtrl.push(AddBookPage);
    }catch(e){
      console.error(e);
    }    
  }

  async goToBookProfile(book: string){
    await this.navCtrl.push(BookPage,book);
  }
  
}
