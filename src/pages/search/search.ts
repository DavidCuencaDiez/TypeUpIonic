import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers:[DataProvider]
})
export class SearchPage {

  searchTerm: string = '';
  books: { Author: string; Avatar: string; Title: string; Description: string; BookCover: string; Id: string; }[];

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
   this.setFilteredItems();
  }

  onSearchInput(){
    this.setFilteredItems();
  }

  setFilteredItems(){
  }

}
