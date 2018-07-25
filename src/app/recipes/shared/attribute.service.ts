import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {ColumnName, ColumnValue, AttributeValues} from'./attributes.model';

@Injectable()
export class AttrubtesService {
attributedata :AttributeValues[]=[];

  constructor(private http : Http) { }
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
