import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {ColumnName, ColumnValue, AttributeValues} from '../../shared/attributes.model';
import {AttrubtesService} from '../../shared/attribute.service';


@Component({
  selector: 'app-addattribute',
  templateUrl: './addattribute.component.html',
  styleUrls: ['./addattribute.component.css'],
  providers: [AttrubtesService] 
})
export class AddattributeComponent implements OnInit {
  @Output() triggerfromModel = new EventEmitter();

  title: string;
  closeBtnName: string;
  dropdownList = [];
  selectedItems = [];
  ColName: ColumnName[];
  ColValues: ColumnValue[];
  AttributeList:AttributeValues[]=[];
  attributename:string;
  selectedcolname:number;
  selectedcolvalue:number;
  selectedfnname:string;
  orandcheckvalue:boolean;

  tempid:number=0;

  constructor(public bsModalRef: BsModalRef, public _dataService: AttrubtesService) { 
    this._dataService.getColNames('GIRFT_NCIP_RnD_BaseComponent');  
  }

  ngOnInit() {
    this.ColName = this._dataService.getColumnName();
     
  }

  onSelect(e) {  
   
    this._dataService.getColValues(e.target.value);
    this.ColValues = this._dataService.getColumnValues().filter((item)=> item.ID == e.target.value);   
   
  } 

  addattribute()
  {

    console.log(this.selectedcolvalue);
    this.tempid=this.tempid+1;     
     
    var s = new AttributeValues();

    s.id = this.tempid; 
    var strtempfn = '';

    strtempfn=this.selectedfnname.replace('_', this._dataService.colnames.find(item => item.ID == this.selectedcolname).Name);

    s.columnname = strtempfn;
    s.columnvalue = this._dataService.colvalues.find(item => item.ID == this.selectedcolvalue).Name;
    s.attributename = this.attributename;

     if(this.orandcheckvalue)
     {
        s.orandoperned="OR";
     }
     else
     {
        s.orandoperned="AND";
     }     

    this.AttributeList.push(s); 
  }

  selectvalue(att:AttributeValues)
  { 
    if(this._dataService.attributedata.find(x=>x.id===att.id))
    {
      this._dataService.attributedata.splice(this._dataService.attributedata.indexOf(att),1);
    }
    else
    {
      this._dataService.attributedata.push(att);
    }  
      
  }

  selectBadge(e,att:AttributeValues)
  {   
    if (e.target.checked)
    {
      att.orandoperned = 'OR';
    }
    else
    {
      att.orandoperned = 'AND';
    }    
  }

  onclose()
  {
    this.triggerfromModel.emit(this._dataService.attributedata);
    this.bsModalRef.hide();
  }

}
