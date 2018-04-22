import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListServices } from '../../services/shopping-list';
import { RecipesService } from '../../services/recipes';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public slService: ShoppingListServices,
              public recipesService: RecipesService,
              public toastCtrl: ToastController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  ngOnInit() {
    this.recipe =  this.navParams.get('recipe');
    this.index =  this.navParams.get('index');

  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index })
  }

  onAddIngredients() {
     this.slService.addItems(this.recipe.ingredients);
     const toast = this.toastCtrl.create({
      message: 'Ingredients Added to Shopping List!',
      duration: 1500,
      position: 'bottom'
    });  
    toast.present();

  }

  onDeleteRecipe() {
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
