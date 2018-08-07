import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Addrecipe} from './addrecipe.model';
import {Columnnamevalue} from './columnnamevalue.model';

@Injectable()
export class RecipedetailsService {
  recipeList : Addrecipe[];
  colNames: Columnnamevalue[]=[];
  colValues: string[]=[];
  query:string;
  selectedcolumn = [];
  
  
  constructor(private http : Http) { }

  getColNames(){
    this.http.get('http://localhost:28750/api/addrecipe/Index')
    .map((data : Response) =>{
      return data.json() as Columnnamevalue[];
    }).toPromise().then(x => {
      this.colNames = x;
    })
  }

  getColValues(colname:string){
    this.http.get('http://localhost:28750/api/addrecipe/Index?colname='+colname)
    .map((data : Response) =>{
      return data.json() as string[];
    }).toPromise().then(x => {
      this.colValues = x;
    })
  }

  getRecipebyId(id:number){
    this.http.get('http://localhost:28750/api/addrecipe/Index/id')
    .map((data : Response) =>{
      return data.json() as Addrecipe[];
    }).toPromise().then(x => {
      this.recipeList = x;
    })
  }


  saveRecipe(rec : Addrecipe[]){    
    var body = JSON.stringify(rec);    
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:28750/api/addrecipe/Save',body,requestOptions).map(x => x.json());
  }
  
}
