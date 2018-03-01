import { Observable } from 'rxjs/Observable';
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
  addRemove : string;
  add : boolean = false;
  constructor(private afAuth: AngularFireAuth,private afDatabase : AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      this.book = navParams.data;
      this.afAuth.authState.take(1).subscribe(auth =>{
        this.afDatabase.list(`bookcollection/${auth.uid}`).valueChanges().subscribe(bc=>{
          bc.filter(b=>{
            if(b == this.book.id){
              this.add = true;
            }
          })
        })
      }) 
  }

  async addRemoveBook(){

    if(!this.add){
      await this.afAuth.authState.take(1).subscribe(auth =>{
        this.afDatabase.list(`bookcollection/${auth.uid}`).push(this.book.id)
      })
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

    }

    this.add = !this.add;
  }

}
