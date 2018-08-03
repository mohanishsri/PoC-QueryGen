import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr'

import {Addrecipe} from '../../shared/addrecipe.model';
import {RecipedetailsService} from '../../shared/recipedetails.service';
import {DisplayresultService} from '../../shared/displayresult.service';

import {Displaydata, QueryClass} from '../../shared/displaydata.model';

@Component({
  selector: 'app-dislpayresult',
  templateUrl: './dislpayresult.component.html',
  styleUrls: ['./dislpayresult.component.css']
})
export class DislpayresultComponent implements OnInit {
// fetch or create an Object of UserDetails type and pass it to dynamic-table
//private userDetails: Array<UserDetails>;
private userDetails: Array<Displaydata>;
// required to provide the table header, you can call an api or hard code the column name.
private tableHead: Array<String>;  
// optional, you can hard code the property name or just send the data of an object and dynamic-table component will figure out.
private tableColName: Array<String>;     
  id:number;
  queryData:QueryClass;

  constructor(private _route:ActivatedRoute, public recService: RecipedetailsService
              ,public disService:DisplayresultService, private toastr: ToastrService ) {
    this.tableHead = new Array<string>();
    this.tableColName = new Array<string>();

    for(let i=0; i<this.recService.selectedcolumn.length; i++){      
        this.tableHead.push(this.recService.selectedcolumn[i].itemName);
        this.tableColName.push(this.recService.selectedcolumn[i].itemName);
    }    
    
     this.userDetails = new Array<Displaydata>();      
      //this.userDetails = new Array<UserDetails>();      
   }

  ngOnInit() {
    
    this._route.paramMap.subscribe(params => {
      this.id=+params.get('id');      
      });       

     
      this.disService.postRecipe(this.recService.query)
      .subscribe(data => {        
        this.disService.getResultsToDisplay();
        this.toastr.success('New Record Added Succcessfully', 'Recipe Register');
      })

      console.log('this is in display component');
      console.log(this.disService.dislpayDataList);

      this.userDetails = this.disService.dislpayDataList;

    //this.userDetails.push(new UserDetails('Apple', 18, 'Male'));
     //this.userDetails.push(new UserDetails('Banana', 24, 'Female'));
     //this.userDetails.push(new UserDetails('Mango', 34, 'Male'));
    // this.userDetails.push(new UserDetails('Orange', 13, 'Female'));
    // this.userDetails.push(new UserDetails('Guava', 56, 'Male'));    
      
  }

}

export class UserDetails{
  constructor(public AGEGROUP_Derived: String, public DIAG_04_Derived: Number, public DIAG_10_Derived: String) { }
}