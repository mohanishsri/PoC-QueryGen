import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Columnnamevalue } from './columnnamevalue.model';

@Injectable()
export class NewattributeService {
  columnValues : Columnnamevalue[]=[];

  constructor(private http : Http) { }

  getColumnValues(colname:string){    
    this.http.get('http://localhost:28750/api/addattribute/Index?colname='+colname)
    .map((data : Response) =>{
      return data.json() as Columnnamevalue[];
    }).toPromise().then(x => {
      this.columnValues = x;     
    })
  }

  saveNewAttribute(colname:string, rec : Columnnamevalue[]){    
    var body = JSON.stringify(rec);    
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:28750/api/recipe/Save',body,requestOptions).map(x => x.json());
  }

}
