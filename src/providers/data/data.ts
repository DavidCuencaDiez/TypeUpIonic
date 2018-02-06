import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  books: any;
  myBooks;

  constructor(public http: HttpClient) {
    this.books = [
      {
        Author: 'David Cuenca',
        Avatar : 'https://png.icons8.com/color/1600/avatar.png',
        Title: 'Candemore in da morning', 
        Description: 'In da night to da morning hight person in da world take my vagina',
        BookCover: 'https://about.canva.com/wp-content/uploads/sites/3/2015/01/children_bookcover.png',
        Id: 1
      },

      {
        Author: 'Marc Carbonell',
        Avatar : 'https://png.icons8.com/color/1600/avatar.png',
        Title: 'Hight the tundra', 
        Description: 'In da night to da morning hight person in da world take my vagina',
        BookCover: 'https://about.canva.com/wp-content/uploads/sites/3/2015/01/children_bookcover.png',
        Id: 2
    },
      
      {
        Author: 'Don Bosco',
        Avatar : 'https://png.icons8.com/color/1600/avatar.png',
        Title: 'Hard Sex', 
        Description: 'In da night to da morning hight person in da world take my vagina',
        BookCover: 'https://about.canva.com/wp-content/uploads/sites/3/2015/01/children_bookcover.png',
        Id: 3
      },
    ]
    this.myBooks = [
      1
    ];
  }

  filterItems(searchTerm){
 
        return this.books.filter((book) => {
            return book.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });    
 
  }

  getMyBooks(){
   return this.books.filter((book) =>{
     return book.Id.indexOf(this.myBooks);
   })
  }

}
