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
  
  constructor(private afAuth: AngularFireAuth,private afDatabase : AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      this.addRemove = 'add';
      this.buttonColor = 'secondary';
      this.book = navParams.data;
      this.afAuth.authState.take(1).subscribe(auth =>{
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

}
