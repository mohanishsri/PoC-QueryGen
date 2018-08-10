import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap'; 

import {BsModalRef, TabsetComponent,TabDirective} from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr'

import{Addrecipe} from '../shared/addrecipe.model';
import {NewrecipeComponent} from './newrecipe/newrecipe.component';
import {RecipedetailsService} from '../shared/recipedetails.service';
import { CustomdataService } from '../shared/customdata.service';
import { BrowserPlatformLocation } from '../../../../node_modules/@angular/platform-browser/src/browser/location/browser_platform_location';
import { DislpayresultComponent } from './dislpayresult/dislpayresult.component';
import { forEach } from '../../../../node_modules/@angular/router/src/utils/collection';
import { element } from '../../../../node_modules/protractor';

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
  validationmsg:string='';


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
    this.recService.colValues=[]; // set inial value to blank
    
this.dropdownSettings = { 
    singleSelection: false, 
    text:"Select Columns",
    selectAllText:'Select All',
    unSelectAllText:'UnSelect All',
    enableSearchFilter: true,
    classes:"myclass custom-class"
  }; 

    this.staticTabs.tabs[0].active = true;
  }

ValidationInputFields(callby:string):boolean
{  
  this.validationmsg='';
  var valid = true;

  if(callby=='add' && this.rectosave.length>=1)
  {
    console.log('check 1');
    for(let i=0; i<this.rectosave.length; i++)
    {
      console.log('check 2');
      if(this.rectosave[i].AndOr==null)
      {
        console.log('check 3');
        this.toastr.warning("can't add more clause as missed Or/And condition"); 
        valid = false;
      }
    }        
  }

  if(this.selectedItems.length==0)
      {
        this.validationmsg+=' "Select Columns", \n';
      }
  
  if(valid && callby=='add')
  {     

      if(this.newAttribute.Attribute==null || this.newAttribute.Attribute=='0')
      {
        this.validationmsg+=' "Display Column" , \n';
        
      }
      if(this.newAttribute.Priority==null)
      {
        this.validationmsg+=' "Priority" , \n';    
      }
      if(this.newAttribute.Condition==null)
      {
        this.validationmsg+=' "Condition" , \n';
        
      }
      
      if(this.newAttribute.Codegroup==null || this.newAttribute.Codegroup=='0' || this.newAttribute.Codegroup=='1')
      {
        this.validationmsg+=' "Code Group", \n';
        
      }
  }

  if(this.validationmsg!='')
  {
    valid = false;
    this.validationmsg = 'Please select Following :' + '\n' + this.validationmsg;
    this.toastr.warning(this.validationmsg);
  }
  

  return valid;
}

addFieldValue() {
  if(this.ValidationInputFields('add'))
  {
    this.fieldArray.push(this.newAttribute);
    this.rectosave.push(this.newAttribute);// for save
    this.newAttribute = new Addrecipe();     
  } 
}

deleteFieldValue(index) {
  this.rectosave.splice(index,1) ;
    this.fieldArray.splice(index, 1);
}

onSelectCol()
{    
  if(this.newAttribute.Attribute!='0')
  {
    this.recService.getColValues(this.newAttribute.Attribute);
  }
}

onSelect(e){ 
  if(this.newAttribute.Attribute!='0' && this.newAttribute.Attribute!=null)
  {
    this.openModalWithComponent(e.target.value);
  }
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
  this.creatednewattrname = result as string;  
  //this.dropdownvalues.splice(0,0,this.creatednewattrname); 
  this.recService.getColValues(this.newAttribute.Attribute);
  this.newAttribute.Codegroup = this.creatednewattrname;
}

backmove()
  {
    this._routeback.navigate(['']);
  }

ValidationInputFieldOnSubmit():boolean
{
  var valid=true;

      if(this.rectosave.length==0)
        {
          this.toastr.warning("Please select at least one where clause");
          valid = false;
        }

      else if(this.rectosave.length>1)
      {
        for(let i=0; i<this.rectosave.length-1; i++)
        {
          if(this.rectosave[i].AndOr==null)
          {
            this.toastr.warning("Please select missing conditional 'And/Or' operator"); 
            valid = false;
          }
        }        
      }

  return valid;
}

genquery()
{   
    if(this.ValidationInputFields('submit'))
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
        
        var a = Array();

        for(let i=0;i<this.rectosave.length;i++)
        {
            a.push(this.rectosave[i].Priority)
        }

        var unique = a.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
        
        var strwhere = ' Where';
        var rectosave1:Addrecipe[]=[];
        var strtemp = '';

        for(let j=0;j<unique.length;j++)
        {
          rectosave1=[];

          for(let i=0;i<this.rectosave.length;i++)
            { 
              if(this.rectosave[i].Priority==unique[j].toString())                 
              {
                rectosave1.push(this.rectosave[i]);                
              }             
            }      
            
            if(strtemp=='')
            {
              strtemp = this.getwhereclause(rectosave1);
            }
            else
            {
              strtemp = strtemp + ' AND '+ this.getwhereclause(rectosave1);
            }
        }      
       
        strwhere = strwhere + '  ' + strtemp;
        
        this.query = strfinal.concat(strwhere.toString());      
        this.recService.query = this.query;
  }
}

getwhereclause(rectosave1:Addrecipe[]):string
{
  var tempwhere : string = '';
  for(let i=0;i<rectosave1.length;i++)
  { 
    var orand = (i<rectosave1.length-1)?(rectosave1[i].AndOr!=null?rectosave1[i].AndOr:""):'';

    var colname = rectosave1[i].FunctionAttribute!=null?
                  rectosave1[i].FunctionAttribute.replace("_", rectosave1[i].Attribute):rectosave1[i].Attribute;

    rectosave1[i].PreLogicalOperator = "(";
    rectosave1[i].PostLogicalOperator = ")";
    
    tempwhere = tempwhere  + "  " + colname + '  ' +
                            rectosave1[i].Condition + ' ' +
                            "(Select Value from [dbo].[Lookup_Codes_Mohanish] where Attribute_Alias = "+ 
                          "'" + rectosave1[i].Codegroup +"' ) " + orand;    
   
   } 
  return "( " +tempwhere+" )";
}

savedata()
{
  if(this.ValidationInputFields('save'))
  {
    if(this.rectosave.length>0)
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
    else
    {
      this.toastr.warning("No where clause selected");
    }
  }     
}

moveon(){    
  if(this.ValidationInputFields('save'))
  {
    if(this.rectosave.length>0)
      {
        this.recService.selectedcolumn = this.selectedItems; 
        this.customdataService.setId(this.id);

        this.bsModalRef = this.modalService.show(DislpayresultComponent, {class: 'modal-lg'});

        //this.router.navigate(['displayresult', this.id, this.speciality, this.recipeparent, this.recipename]);
        //this.router.navigate(['createrecipe', rec.RecipeId, rec.Specialty, rec.Recipe_Parent, rec.Recipe])
      }
    else
    {
      this.toastr.warning("No where clause selected");
    }
  }  
}



}
