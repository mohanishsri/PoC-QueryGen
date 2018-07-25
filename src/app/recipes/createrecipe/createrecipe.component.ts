import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap';
import {BsModalRef} from 'ngx-bootstrap';

import { Recipe } from '../shared/recipe.model';
import {AttributeValues} from '../shared/attributes.model';

import { AddattributeComponent } from './addattribute/addattribute.component';

@Component({
  selector: 'app-createrecipe',
  templateUrl: './createrecipe.component.html',
  styleUrls: ['./createrecipe.component.css']
})
export class CreaterecipeComponent implements OnInit {
bsModalRef: BsModalRef;
id:number;
speciality:string;
recipeparent:string;
recipename:string; 
query:string;
inputtable:string;
attributevaluefromModel:AttributeValues[]=[];
ngs 

dropdownList = [];
selectedItems = [];
dropdownSettings = {};

  constructor(private _route:ActivatedRoute, private _routeback:Router, private modalService: BsModalService) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
    this.id=+params.get('id');   
    console.log(this.id);
    });   
    
    this._route.paramMap.subscribe(params => {
      this.speciality=params.get('sp');       
      });
      
    this._route.paramMap.subscribe(params => {
        this.recipeparent=params.get('rp');   
       
        });

    this._route.paramMap.subscribe(params => {
       this.recipename=params.get('r');
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

openModalWithComponent() {
  const initialState = {
    list: [
      'Open a modal with component',
      'Pass your data',
      'Do something else',
      '...'
    ],
    title: 'Modal with component'
  };  
  this.bsModalRef = this.modalService.show(AddattributeComponent, {initialState});

  this.bsModalRef.content.triggerfromModel.subscribe(result => {
    this.attributevaluefromModel = result as AttributeValues[]
      })
      
  this.bsModalRef.content.closeBtnName = 'Close';
}


genquery()
{  
  let str:string='';  

    console.log(this.attributevaluefromModel);
    
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

}

}
