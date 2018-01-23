import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  books: { "Author": string; "Avatar": string; "Title": string; "Description": string; "BookCover": string; }[];

  constructor(public navCtrl: NavController) {
    this.books = this.getBooks();
  }

  getBooks(){
    return [
      {"Author": "David Cuenca",
      "Avatar" : "https://png.icons8.com/color/1600/avatar.png",
      "Title": "Candemore in da morning", 
      "Description": "In da night to da morning hight person in da world take my vagina",
      "BookCover": "https://about.canva.com/wp-content/uploads/sites/3/2015/01/children_bookcover.png"},

      {"Author": "Marc Carbonell",
      "Avatar" : "https://png.icons8.com/color/1600/avatar.png",
      "Title": "Hight the tundra", 
      "Description": "In da night to da morning hight person in da world take my vagina",
      "BookCover": "https://about.canva.com/wp-content/uploads/sites/3/2015/01/children_bookcover.png"},
      
      {"Author": "Don Bosco",
      "Avatar" : "https://png.icons8.com/color/1600/avatar.png",
      "Title": "Hard Sex", 
      "Description": "In da night to da morning hight person in da world take my vagina",
      "BookCover": "https://about.canva.com/wp-content/uploads/sites/3/2015/01/children_bookcover.png"},
    ]
  }

}
