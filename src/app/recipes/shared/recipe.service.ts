import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Recipe} from'./recipe.model'

@Injectable()
export class RecipeService { 
  selectedRecipe : Recipe;
  recipeList : Recipe[];
  
  constructor(private http : Http) { }

  postRecipe(rec : Recipe){
    var body = JSON.stringify(rec);    
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:28750/api/recipe/Create',body,requestOptions).map(x => x.json());
  }

  saveRecipe(rec : Recipe[]){    
    var body = JSON.stringify(rec);    
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:28750/api/recipe/Save',body,requestOptions).map(x => x.json());
  }

  putRecipe(id:Number, recobj:Recipe) {    
    var body = JSON.stringify(recobj);    
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:28750/api/recipe/Edit',
      body,
      requestOptions).map(res => res.json());
  }
  getRecipe(){
    this.http.get('http://localhost:28750/api/recipe/Index')
    .map((data : Response) =>{
      return data.json() as Recipe[];
    }).toPromise().then(x => {
      this.recipeList = x;
    })
  }

  getSearchRecipe(rec:Recipe){         
    this.http.get('http://localhost:28750/api/recipe/Search?searchvalues='+ rec.Recipe + '|' + rec.Recipe_Parent + '|' + rec.Specialty + '|' + rec.Priority +'&id=0')
    .map((data : Response) =>{
      return data.json() as Recipe[];
    }).toPromise().then(x => {
      this.recipeList = x;
    })    
  }

  deleteRecipe(id: number) {
    return this.http.delete('http://localhost:28750/api/recipe/Delete/' + id).map(res => res.json());
  }
}
