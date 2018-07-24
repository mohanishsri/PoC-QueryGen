import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import { Recipe } from '../shared/recipe.model';
@Component({
  selector: 'app-createrecipe',
  templateUrl: './createrecipe.component.html',
  styleUrls: ['./createrecipe.component.css']
})
export class CreaterecipeComponent implements OnInit {
id:number;
speciality:string;
recipeparent:string;
recipename:string; 
query:string;
inputtable:string;
ngs 

dropdownList = [];
selectedItems = [];
dropdownSettings = {};

  constructor(private _route:ActivatedRoute, private _routeback:Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
    this.id=+params.get('id');   
    console.log(this.id);
    });   
    
    this._route.paramMap.subscribe(params => {
      this.speciality=params.get('sp');   
      console.log(this.speciality);
      });
      
    this._route.paramMap.subscribe(params => {
        this.recipeparent=params.get('rp');   
        console.log(this.recipeparent);
        });

    this._route.paramMap.subscribe(params => {
       this.recipename=params.get('r');   
       console.log(this.recipename);
          });

    this.dropdownList = [
      {"id":1,"itemName":"India"},
      {"id":2,"itemName":"Singapore"},
      {"id":3,"itemName":"Australia"},
      {"id":4,"itemName":"Canada"},
      {"id":5,"itemName":"South Korea"},
      {"id":6,"itemName":"Germany"},
      {"id":7,"itemName":"France"},
      {"id":8,"itemName":"Russia"},
      {"id":9,"itemName":"Italy"},
      {"id":10,"itemName":"Sweden"}
    ];

this.dropdownSettings = { 
          singleSelection: false, 
          text:"Select Columns",
          selectAllText:'Select All',
          unSelectAllText:'UnSelect All',
          enableSearchFilter: true,
          classes:"myclass custom-class"
        }; 
  }

  backmove()
  {
    this._routeback.navigate(['']);
  }

  onItemSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
onSelectAll(items: any){
    console.log(items);
}
onDeSelectAll(items: any){
    console.log(items);
}

genquery()
{
  console.log('hi');
  let str:string=''; 
  console.log(this.selectedItems);
  
  for(let i=0; i<this.selectedItems.length; i++){
   
    if(str!='')
    {
      str = str + ', ' + this.selectedItems[i].itemName + ' ';
    }
    else
    {
      str = this.selectedItems[i].itemName;
    }
 } 

  
  var str1 = new String( "Select " + str ); 
  var str2 = new String( "From " + this.inputtable.toString());
  
  var str3 = str1.concat(str2.toString());  

  this.query = str3.toString();


}

}
