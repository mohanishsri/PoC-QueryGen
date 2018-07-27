import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {ColumnName, ColumnValue, AttributeValues, ColNameForCreate} from'./attributes.model';

@Injectable()
export class AttrubtesService {
localtablename:string;
attributedata :AttributeValues[]=[];
tablenames:string[]=[];
colnames:ColumnName[]=[];
colvalues:ColumnName[]=[];
colnameforcreate:ColumnName[]=[];

  constructor(private http : Http) { }


  // get method to reterive tablenames
  getTableNames(){
    this.http.get('http://localhost:28750/api/attribute/Index')
    .map((data : Response) =>{
      return data.json() as string[];
    }).toPromise().then(x => {
      this.tablenames = x;
    })
  }

  // get method to reterive tablenames
  getColNames(tablename:string){
    this.localtablename = tablename;
    this.http.get('http://localhost:28750/api/attribute/search?tablename='+ tablename + '&ID='+-1)
    .map((data : Response) =>{
      return data.json() as ColumnName[];
    }).toPromise().then(x => {
      this.colnames = x;
    })    
  }
 // this get methid call from create component
  getColNamesForCreate(tablename:string){    
    this.http.get('http://localhost:28750/api/attribute/search?tablename='+ tablename + '&ID='+-1)
    .map((data : Response) =>{
      return data.json() as ColumnName[];
    }).toPromise().then(x => {
      this.colnameforcreate = x;
    })    
  }

  // get method to reterive tablenames
  getColValues(ID:number){
    console.log('hi');
    this.http.get('http://localhost:28750/api/attribute/search?tablename='+ this.localtablename + '&ID=' + ID)
    .map((data : Response) =>{
      return data.json() as ColumnName[];
    }).toPromise().then(x => {
      this.colvalues = x;
    })
    console.log(this.colvalues);
  }

  getColumnName() {  
    return [  
     new ColumnName(1, 'DIAG_01_Derived'),  
     new ColumnName(2, 'DIAG_02_Derived'),  
     new ColumnName(3, 'DIAG_03_Derived'),
     new ColumnName(3, 'DIAG_04_Derived'),
     new ColumnName(3, 'DIAG_05_Derived')   
    ];  
  }  
  getColumnValues() {  
   return [  
     new ColumnValue(1, 1, 'qq 1'),  
     new ColumnValue(2, 1, 'pp 2'),  
     new ColumnValue(3, 1, 'zz 3'),  
     new ColumnValue(4, 1, 'xx 4'),  
     new ColumnValue(5, 2, 'cc 1'),  
     new ColumnValue(6, 2, 'dd 2'),  
     new ColumnValue(7, 2, 'ff 3'),  
     new ColumnValue(8, 3, 'gg 1'),  
     new ColumnValue(9, 3, 'hh 2'),  
     new ColumnValue(10, 3, 'mm 3')  
    ];  
  }  
  
}
