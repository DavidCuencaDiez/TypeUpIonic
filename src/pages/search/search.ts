import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  searchTerm: string = '';
  books: any;

  constructor(public navCtrl: NavController, public dataService: DataProvider) {

  }

  onSearchInput(){
    this.setFilteredItems();
  }

  setFilteredItems(){
    this.books = this.dataService.filterItems(this.searchTerm);
  }

}
