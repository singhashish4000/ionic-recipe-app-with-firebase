import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, 
     public navParams: NavParams,
     private authServise: AuthService,
     private loadingCtrl: LoadingController,
     private altCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in..'
    });
    loading.present();
    console.log(form);
    this.authServise.signin(form.value.email, form.value.password)
    .then((data) => {
      console.log(data);
      loading.dismiss();
    })
    .catch(error => {
      console.log(error);
      loading.dismiss();
      const alert = this.altCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Okay']
      });
      alert.present();
    });
  }

}
