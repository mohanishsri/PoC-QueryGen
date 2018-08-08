import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap'; 

import {BsModalRef, TabsetComponent,TabDirective} from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr'

import{Addrecipe} from '../shared/addrecipe.model';
import {NewrecipeComponent} from './newrecipe/newrecipe.component';
import {RecipedetailsService} from '../shared/recipedetails.service';
import { CustomdataService } from '../shared/customdata.service';

@Component({
  selector: 'app-addrecipes',
  templateUrl: './addrecipes.component.html',
  styleUrls: ['./addrecipes.component.css']
})
export class AddrecipesComponent implements OnInit {

  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  bsModalRef: BsModalRef;
  creatednewattrname:string;
  dropdownList = [];  
  selectedItems = [];
  dropdownSettings = {};
  inputtable:string='GIRFT_NCIP_RnD_BaseComponent';
  dropdownvalues = [];
  private fieldArray: Array<Addrecipe> = [];
  private newAttribute: Addrecipe = new Addrecipe();
  private rectosave:Addrecipe[]=[];
  id:number;
  speciality:string;
  recipeparent:string;
  recipename:string; 
  query:string;


  constructor(private _route:ActivatedRoute,private modalService: BsModalService, 
          private toastr: ToastrService, public recService: RecipedetailsService, private _routeback:Router
          , private router : Router, public customdataService: CustomdataService) { }

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

    this.recService.getColNames();    
    
    
this.dropdownSettings = { 
    singleSelection: false, 
    text:"Select Columns",
    selectAllText:'Select All',
    unSelectAllText:'UnSelect All',
    enableSearchFilter: true,
    classes:"myclass custom-class"
  }; 

    this.staticTabs.tabs[1].active = true;
  }


addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.rectosave.push(this.newAttribute);// for save

    this.newAttribute = new Addrecipe();
}

deleteFieldValue(index) {
  this.rectosave.splice(index,1) ;
    this.fieldArray.splice(index, 1);
}

onSelectCol()
{  
  
  this.recService.getColValues(this.newAttribute.Attribute);
}

onSelect(e){
  console.log(e.target.value);
  this.openModalWithComponent(e.target.value);
}


onItemSelect(item:any){
  
}
OnItemDeSelect(item:any){
  
}
onSelectAll(items: any){
  
}
onDeSelectAll(items: any){
  
}


openModalWithComponent(value:string) {
  if(value=="1")
  {
    
    this.customdataService.setData(this.newAttribute.Attribute);
    
    this.bsModalRef = this.modalService.show(NewrecipeComponent, {class: 'modal-lg'});   
    
   
    this.bsModalRef.content.triggerfromModel.subscribe(result => {
        this.oncloseModel(result);
        })
        
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}

oncloseModel(result)
{  
  //this.creatednewattrname = result as string;
  //this.dropdownvalues.splice(0,0,this.creatednewattrname); 
  this.recService.getColValues(this.newAttribute.Attribute);
}

backmove()
  {
    this._routeback.navigate(['']);
  }

genquery()
{  
  this.query='';

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
  var str2 = new String( " From dbo." + this.inputtable); 

  var strfinal = str1.concat(str2.toString()); 
  

  var strwhere = '';
  
  for(let i=0;i<this.rectosave.length;i++)
  {    
    
    var orand = this.rectosave[i].AndOr!=null?this.rectosave[i].AndOr:"";

    var colname = this.rectosave[i].FunctionAttribute!=null?
                  this.rectosave[i].FunctionAttribute.replace("_", this.rectosave[i].Attribute):this.rectosave[i].Attribute;

    this.rectosave[i].PreLogicalOperator = "(";
    this.rectosave[i].PostLogicalOperator = ")";

    if(strwhere=='')
    {
      strwhere = " Where " + this.rectosave[i].PreLogicalOperator + colname + ' ' + 
                            this.rectosave[i].Condition + ' ' +
                            "(Select Value from [dbo].[Lookup_Codes_Mohanish] where Attribute_Alias = "+ 
                          "'" + this.rectosave[i].Codegroup +"' ) "+ this.rectosave[i].PostLogicalOperator + orand + " "; 
    }
    else
    {
      strwhere = strwhere + this.rectosave[i].PreLogicalOperator + colname + ' ' + 
                            this.rectosave[i].Condition + ' ' +
                            "(Select Value from [dbo].[Lookup_Codes_Mohanish] where Attribute_Alias = "+ 
                            "'"+ this.rectosave[i].Codegroup +"')"+ this.rectosave[i].PostLogicalOperator + orand;
    }
  } 
  this.query = strfinal.concat(strwhere.toString());      
  this.recService.query = this.query;
}

savedata()
{

  for(let i=0; i<this.rectosave.length;i++)
  {
    this.rectosave[i].RecipeId = this.id;
    this.rectosave[i].Specialty = this.speciality;
    this.rectosave[i].Recipe_Parent = this.recipeparent;
    this.rectosave[i].Recipe = this.recipename;
  }

  this.recService.saveRecipe(this.rectosave).subscribe(data => {    
  });;

  this.toastr.success('New Record Added Succcessfully', 'Recipe Saved');
        
}

moveon(){    
  this.recService.selectedcolumn = this.selectedItems; 
  this.router.navigate(['displayresult', this.id, this.speciality, this.recipeparent, this.recipename]);
  //this.router.navigate(['createrecipe', rec.RecipeId, rec.Specialty, rec.Recipe_Parent, rec.Recipe])
}

}
