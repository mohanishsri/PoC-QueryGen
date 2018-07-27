import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap';
import {BsModalRef, TabsetComponent} from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr'
import { RecipeService } from '../shared/recipe.service';
import { AttrubtesService } from '../shared/attribute.service';

import { Recipe } from '../shared/recipe.model';
import {AttributeValues} from '../shared/attributes.model';

import { AddattributeComponent } from './addattribute/addattribute.component';

@Component({
  selector: 'app-createrecipe',
  templateUrl: './createrecipe.component.html',
  styleUrls: ['./createrecipe.component.css'],
  providers:[RecipeService,AttrubtesService]
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
wherestring:string='';
rectosave:Recipe[]=[];
ngs 

dropdownList = [];
selectedItems = [];
dropdownSettings = {};
selectedAttributes:string='';

@ViewChild('staticTabs') staticTabs: TabsetComponent;

  constructor(private _route:ActivatedRoute, private _routeback:Router, private modalService: BsModalService, private toastr: ToastrService, private recService: RecipeService, private _dataservice: AttrubtesService) {    
    this.inputtable = 'GIRFT_NCIP_RnD_BaseComponent'
  }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
    this.id=+params.get('id');      
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
          // this._dataservice.colnameforcreate;

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

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
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

  this.bsModalRef = this.modalService.show(AddattributeComponent, {class: 'modal-lg'});

  this.bsModalRef.content.triggerfromModel.subscribe(result => {
       this.oncloseModel(result);
      })
      
  this.bsModalRef.content.closeBtnName = 'Close';
}

oncloseModel(result)
{ 
  this.selectedAttributes = '';

  this.attributevaluefromModel = result as AttributeValues[];
  
  for(let i=0; i<this.attributevaluefromModel.length;i++)
  {
    if(this.selectedAttributes!='')
    {      
      this.selectedAttributes = this.selectedAttributes + ', ' + this.attributevaluefromModel[i].attributename;
      this.wherestring = this.wherestring + ' ' + this.attributevaluefromModel[i].orandoperned + ' ' + this.attributevaluefromModel[i].columnname + '=' + 
                          this.attributevaluefromModel[i].columnvalue;
    }
    else
    {
      this.selectedAttributes = this.attributevaluefromModel[i].attributename;
      this.wherestring  = " Where " + this.attributevaluefromModel[i].columnname + '=' + 
                           this.attributevaluefromModel[i].columnvalue +
                           ' ' + this.attributevaluefromModel[i].orandoperned + ' ' ;
    }
  }  
}

genquery()
{  

  let str:string='';      
    
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
  var str2 = new String( "From dbo." + this.inputtable.toString()); 

  var str3 = str1.concat(str2.toString());  

  this.query = str3.concat(this.wherestring.toString());  

  //this.query = str4.toString();

}

savedata()
{

  for(let i=0; i<this.attributevaluefromModel.length;i++)
  {
    var s = new Recipe;
    s.RecipeId = this.id;
    s.Specialty =  this.speciality;
    s.Recipe_Parent = this.recipeparent;
    s.Recipe = this.recipename;
    s.Attribute = this.attributevaluefromModel[i].columnname;
    s.Condition = '=';
    s.Priority = ((document.getElementById("txtpriorty") as HTMLInputElement).value);;
    s.PreLogicalOperator = '(';
    s.PostLogicalOperator = ')' + this.attributevaluefromModel[i].orandoperned;
    s.Codegroup = this.attributevaluefromModel[i].attributename;

    this.rectosave.push(s);
  }

  this.recService.saveRecipe(this.rectosave).subscribe(data => {    
  });;

  this.toastr.success('New Record Added Succcessfully', 'Recipe Saved');
        
}

}
