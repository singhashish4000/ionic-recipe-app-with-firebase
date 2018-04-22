import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListServices } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  items: Ingredient[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public slService: ShoppingListServices) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  ionViewWillEnter() {
    this.loadItems();     
  }

  onAddItem(form: NgForm) {
    console.log(form.value.ingredientAmount);
    this.slService.addItem(form.value.ingredientName,form.value.ingredientAmount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.items =  this.slService.getItems();
  }



}
