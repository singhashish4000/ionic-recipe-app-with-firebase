import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { AuthService } from "./auth";
import 'rxjs/Rx';
import { Recipe } from "../models/recipe";

@Injectable()
export class ShoppingListServices {
   private ingredients: Ingredient[] = [];

   constructor(private http: Http, private authService: AuthService)  {
       
   }
   
   addItem(name: string, amount: number) {
      this.ingredients.push(new Ingredient(name, amount));
   }

   addItems(items: Ingredient[]) {
       this.ingredients.push(...items);
   }

   getItems() {
       return this.ingredients.slice();
   }

   removeItem(index: number) {
       this.ingredients.splice(index, 1);
   }

   storeList(token: string) {
       const userId = this.authService.getActiveUser().uid;
       return this.http
        .put('https://recipe-app-e83ec.firebaseio.com/' + userId + '/shoping_list.json?auth='+ token, this.ingredients)
        .map((response: Response) => {
            return response.json();
        });
   }
   
   fetchList(token: string) {
       const userId = this.authService.getActiveUser().uid;
       return this.http.get('https://recipe-app-e83ec.firebaseio.com/' + userId + '/shoping_list.json?auth='+ token)
       .map((response: Response) => {
           return response.json();
       })
       .do((ingredients : Ingredient[]) => {
           if( ingredients) {
               this.ingredients = ingredients;
           } else {
               this.ingredients = []
           }

       });
   }
}