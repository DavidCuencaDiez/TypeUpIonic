import { EditBookPage } from './../edit-book/edit-book';
import { ReadBookPage } from './../read-book/read-book';
import { Observable } from 'rxjs/Observable';
import { BooksHome } from './../../models/booksHome';
import { Profile } from './../../models/profile';
import { Book } from './../../models/Book';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfilePage } from './../profile/profile';

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {

  buttonColor : string;
  book = {} as BooksHome;
  addRemove : string;
  add : boolean = false;
  edit : boolean = false;

  constructor(private afAuth: AngularFireAuth,private afDatabase : AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      this.addRemove = 'add';
      this.buttonColor = 'secondary';
      try {
        this.afDatabase.list<Book>(`book`).valueChanges().subscribe(bo =>{
          const myBook = bo.find(b => b.id === navParams.data);
          this.book.author = myBook.author;
          this.book.cover = myBook.cover;
          this.book.description = myBook.description;
          this.book.id = myBook.id;
          this.book.title = myBook.title;

          this.afDatabase.object<Profile>(`profile/${this.book.author }`).valueChanges().subscribe(pro => {
            this.book.avatar = pro.avatar;
            this.book.name = pro.name;
            this.book.lastname = pro.lastname;
          })

          this.afAuth.authState.take(1).subscribe(auth =>{
            if(auth.uid == this.book.author){
              this.edit = true;
            }
            this.afDatabase.list(`bookcollection/${auth.uid}`).valueChanges().subscribe(bc=>{
              bc.filter(b=>{
                if(b == this.book.id){
                  this.add = true;
                  this.addRemove = 'remove';
                  this.buttonColor = 'danger';
                }
              })
            })
          })
        })        
      } catch (e) {
        console.error(e);
      } 
  }

  async goToProfilePage(id : string){
    await this.navCtrl.push(ProfilePage,id);
  }
  async goReadBook(){
    await this.navCtrl.push(ReadBookPage);
  }
  async addRemoveBook(){

    if(!this.add){

      await this.afAuth.authState.take(1).subscribe(auth =>{
        this.afDatabase.list(`bookcollection/${auth.uid}`).push(this.book.id)
      })

      this.addRemove = 'remove';
      this.buttonColor = 'danger';
    }else{

      await this.afAuth.authState.take(1).subscribe(auth =>{
        var collection = this.afDatabase.database.ref(`bookcollection/${auth.uid}`).once('value', snap =>{
          snap.forEach( bc => {
            if(bc.val() == this.book.id){
              this.afDatabase.list(`bookcollection/${auth.uid}`).remove(bc.key);
              return true;
            }            
          });
        });      
        });
        this.buttonColor = 'secondary';
        this.addRemove = 'add';
    }

    this.add = !this.add;
  }
  async editBook(){
    await this.navCtrl.push(EditBookPage, this.book.id);
  }
}
