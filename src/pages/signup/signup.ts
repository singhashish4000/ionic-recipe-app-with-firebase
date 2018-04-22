import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Button } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private altCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up..'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        console.log(data);
        loading.dismiss();
      })
      .catch(error => {
        console.log(error);
        loading.dismiss();
        const alert = this.altCtrl.create({
            title: 'Signup failed!',
            message: error.message,
            buttons: ['Okay']
        });
        alert.present();
      });
  }

}
