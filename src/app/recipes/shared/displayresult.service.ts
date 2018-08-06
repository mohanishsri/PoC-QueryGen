import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import {Displaydata, QueryClass} from './displaydata.model';

@Injectable()
export class DisplayresultService {
  displaydata:Displaydata;
  dislpayDataList : Array<Displaydata> = new Array<Displaydata>();
  constructor(private http : Http) { }

  postRecipe(query : string){
    var body = JSON.stringify(query);    
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:28750/api/displayrecipe/Create',body,requestOptions).map(x => x.json());
  }
 

  getResultsToDisplay(){        
    this.http.get('http://localhost:28750/api/displayrecipe/index')
    .map((data : Response) =>{
      return data.json() as Displaydata[];
    }).toPromise().then(x => {
      this.dislpayDataList = x; 
      console.log('after service');
      console.log(this.dislpayDataList);
    })    
  }
}
