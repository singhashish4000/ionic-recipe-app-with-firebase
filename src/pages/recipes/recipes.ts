import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController,LoadingController, AlertController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes';
import { RecipePage } from '../recipe/recipe';
import { DatabaseOptionsPage } from '../database-options/database-options';
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public recipesService: RecipesService,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService) {
  }

  ionViewWillEnter() {
     this.recipes = this.recipesService.getRecipe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  onNewRecipe() {
    console.log('ss');
    this.navCtrl.push(EditRecipePage, { mode: 'New' });
  }

  onLoadRecipe(recipe: Recipe, index: number) {
     this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }

  onShowOptions(event: MouseEvent) {
      const loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      const popover = this.popoverCtrl.create(DatabaseOptionsPage);
      popover.present({ev: event});
      popover.onDidDismiss(data => {
        if(data) {
        if (data.action == 'load') {
          loading.present(); 
          this.authService.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.recipesService.fetchList(token)
              .subscribe(
                (list: Recipe[]) => {
                  loading.dismiss();
                  if (list) {
                    this.recipes = list;
                  } else {
                    this.recipes = [];
                  }
                  console.log('Success!')
                },
                error => {
                  this.handleError(error);
                  loading.dismiss();
                });               
            }
          )             
          } else if (data.action == 'store') {
          loading.present();
            this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.recipesService.storeList(token)
                .subscribe(
                  () => {
                    loading.dismiss();
                    
                  },
                  (error) => {
                    this.handleError(error);
                    loading.dismiss();
                  });               
              }
            )
          }
        }
      });
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured!',
      message: 'Please try again in few minutes',
      buttons: ['Ok']
    });
    alert.present();
  }

}
