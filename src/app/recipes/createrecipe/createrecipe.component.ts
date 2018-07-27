import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap';
import {BsModalRef, TabsetComponent} from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr'
import { RecipeService } from '../shared/recipe.service';
import { AttrubtesService } from '../shared/attribute.service';

import { Recipe } from '../shared/recipe.model';
import {AttributeValues, ColNameForCreate} from '../shared/attributes.model';

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
colnamesforcreate:ColNameForCreate[]=[];
ngs 

dropdownList = [];
selectedItems = [];
dropdownSettings = {};
selectedAttributes:string='';

@ViewChild('staticTabs') staticTabs: TabsetComponent;

  constructor(private _route:ActivatedRoute, private _routeback:Router, private modalService: BsModalService, private toastr: ToastrService, private recService: RecipeService, private _dataservice: AttrubtesService) {    
    this.inputtable = 'GIRFT_NCIP_RnD_BaseComponent';    
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

          this.dropdownList = [
            {"id":1,"itemName":"AGEGROUP_Derived"},
            {"id":2,"itemName":"DIAG_01_Derived"},
            {"id":3,"itemName":"DIAG_02_Derived"},
            {"id":4,"itemName":"DIAG_03_Derived"},
            {"id":5,"itemName":"DIAG_04_Derived"},
            {"id":6,"itemName":"DIAG_05_Derived"},
            {"id":7,"itemName":"DIAG_06_Derived"},
            {"id":8,"itemName":"DIAG_07_Derived"},
            {"id":9,"itemName":"DIAG_08_Derived"},
            {"id":10,"itemName":"DIAG_09_Derived"},
            {"id":10,"itemName":"DIAG_10_Derived"},
            {"id":10,"itemName":"DIAG_11_Derived"},
            {"id":10,"itemName":"DIAG_09_Derived"},
            {"id":10,"itemName":"DIAG_09_Derived"},
            {"id":10,"itemName":"DIAG_12_Derived"},
            {"id":10,"itemName":"OPERTN_01_Derived"},
            {"id":10,"itemName":"OPERTN_02_Derived"},
            {"id":10,"itemName":"OPERTN_03_Derived"},
            {"id":10,"itemName":"OPERTN_04_Derived"},
            {"id":10,"itemName":"OPERTN_05_Derived"},
            {"id":10,"itemName":"OPERTN_06_Derived"},
            {"id":10,"itemName":"OPERTN_07_Derived"},
            {"id":10,"itemName":"OPERTN_08_Derived"},
            {"id":10,"itemName":"OPERTN_09_Derived"},
            {"id":10,"itemName":"OPERTN_10_Derived"},
            {"id":10,"itemName":"OPERTN_11_Derived"},
            {"id":10,"itemName":"OPERTN_12_Derived"},
            {"id":10,"itemName":"OPERTN_13_Derived"},
            {"id":10,"itemName":"OPERTN_14_Derived"},
            {"id":10,"itemName":"OPERTN_15_Derived"},
            {"id":10,"itemName":"OPERTN_16_Derived"},
            {"id":10,"itemName":"OPERTN_17_Derived"},
            {"id":10,"itemName":"OPERTN_18_Derived"},
            {"id":10,"itemName":"OPERTN_19_Derived"},
            {"id":10,"itemName":"OPERTN_20_Derived"},
            {"id":10,"itemName":"OPERTN_21_Derived"},
            {"id":10,"itemName":"OPERTN_22_Derived"},
            {"id":10,"itemName":"OPERTN_23_Derived"},
            {"id":10,"itemName":"OPERTN_24_Derived"},
            

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
  
  if(this.attributevaluefromModel.length==1)
  {
    this.selectedAttributes = this.attributevaluefromModel[0].attributename;
    this.wherestring  = " Where " + this.attributevaluefromModel[0].columnname + '=' + 
                       "'" + this.attributevaluefromModel[0].columnvalue +"'";
  }

  else
  {
      for(let i=0; i<this.attributevaluefromModel.length;i++)
      {
        if(this.selectedAttributes!='')
        {      
          this.selectedAttributes = this.selectedAttributes + ', ' + this.attributevaluefromModel[i].attributename;
          this.wherestring = this.wherestring + ' ' + this.attributevaluefromModel[i].orandoperned + ' ' +
                             this.attributevaluefromModel[i].columnname + '=' + 
                             "'" + this.attributevaluefromModel[i].columnvalue +"'";
        }
        else
        {     

          this.selectedAttributes = this.attributevaluefromModel[i].attributename;
          this.wherestring  = " Where " + this.attributevaluefromModel[i].columnname + '=' + 
                               "'" + this.attributevaluefromModel[i].columnvalue +"'" +
                              ' ' + this.attributevaluefromModel[i].orandoperned + ' ' ;
        }
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
