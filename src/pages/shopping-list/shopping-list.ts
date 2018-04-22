import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController,LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListServices } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { AuthService } from '../../services/auth';
import { DatabaseOptionsPage } from '../database-options/database-options';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  items: Ingredient[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public slService: ShoppingListServices,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController ) {
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
                this.slService.fetchList(token)
                .subscribe(
                  (list: Ingredient[]) => {
                    loading.dismiss();
                    if (list) {
                      this.items = list;
                    } else {
                      this.items = [];
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
                  this.slService.storeList(token)
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

  private loadItems() {
    this.items =  this.slService.getItems();
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
