import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Book } from '../../models/Book';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-edit-book',
  templateUrl: 'edit-book.html',
})
export class EditBookPage {
  book = {} as Book;
  constructor(private afDatabase : AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.afDatabase.list<Book>(`book`).valueChanges().subscribe(bo =>{
      this.book = bo.find(b => b.id === navParams.data);
    })
  }
  async editBook(){
    try {
      this.afDatabase.database.ref(`book`).once('value', bo =>{
        return bo.forEach(b => {
            if(b.val().id == this.navParams.data){
              console.log("update")
              this.afDatabase.object<Book>(`book/${b.key}`).update(this.book);
              return true
            }
            
          }
        )
      })
    } catch (error) {
      console.error(error)
    }

  }
}
