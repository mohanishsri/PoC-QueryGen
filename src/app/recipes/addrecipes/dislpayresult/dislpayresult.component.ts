import { Component,OnInit, Output, EventEmitter } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

import {Addrecipe} from '../../shared/addrecipe.model';
import {RecipedetailsService} from '../../shared/recipedetails.service';
import {DisplayresultService} from '../../shared/displayresult.service';

import {Displaydata, QueryClass} from '../../shared/displaydata.model';
import  {CustomdataService} from '../../shared/customdata.service';

@Component({
  selector: 'app-dislpayresult',
  templateUrl: './dislpayresult.component.html',
  styleUrls: ['./dislpayresult.component.css']
})
export class DislpayresultComponent implements OnInit {  
@Output() triggerfromModel = new EventEmitter(); 
// fetch or create an Object of UserDetails type and pass it to dynamic-table
//private userDetails: Array<UserDetails>;
private userDetails: Array<Displaydata>;// = new Array<any>();// Displaydata[]=[]//Array<Displaydata>;
// required to provide the table header, you can call an api or hard code the column name.
private tableHead: Array<String>;  
// optional, you can hard code the property name or just send the data of an object and dynamic-table component will figure out.
private tableColName: Array<String>;       
  queryData:QueryClass;  
  querytodisplay: string;

  constructor(public bsModalRef: BsModalRef,private _route:ActivatedRoute, public recService: RecipedetailsService
              ,public disService:DisplayresultService, public customerDataService: CustomdataService,
               private router : Router ) {
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
    
      this.disService.postRecipe(this.recService.query, this.customerDataService.getId())
      .subscribe(data => { 
        this.disService.getResultsToDisplay(this.customerDataService.getId());           
      })                 
     
      this.querytodisplay = this.recService.query;

    //this.userDetails.push(new UserDetails('Apple', 18, 'Male'));
     //this.userDetails.push(new UserDetails('Banana', 24, 'Female'));
     //this.userDetails.push(new UserDetails('Mango', 34, 'Male'));
    // this.userDetails.push(new UserDetails('Orange', 13, 'Female'));
    // this.userDetails.push(new UserDetails('Guava', 56, 'Male'));    
      
  }

  moveback()
  {   
    this.triggerfromModel.emit(this.querytodisplay); 
    this.bsModalRef.hide();
    //this.router.navigate(['addrecipe',this.id, this.speciality, this.recipeparent, this.recipename])
  }

  movehome()
  {   
    this.bsModalRef.hide();
    this.router.navigate([''])
  }

  executequery()
  {
    this.recService.query = this.querytodisplay;
    this.disService.postRecipe(this.recService.query, this.customerDataService.getId())
      .subscribe(data => { 
        this.disService.getResultsToDisplay(this.customerDataService.getId());           
      }) 
  }
}

export class UserDetails{
  constructor(public AGEGROUP_Derived: String, public DIAG_04_Derived: Number, public DIAG_10_Derived: String) { }
}
