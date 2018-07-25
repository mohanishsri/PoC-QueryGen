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
  tempid:number=0;

  constructor(public bsModalRef: BsModalRef, public _dataService: AttrubtesService) { 
    this.ColName = this._dataService.getColumnName();
  }

  ngOnInit() {
  }

  onSelect(ID) {       
    this.ColValues = this._dataService.getColumnValues().filter((item)=> item.ID == ID);    
   
  } 

  addattribute()
  {
     this.tempid=this.tempid+1;
     var s = new AttributeValues();

     s.id = this.tempid;
     
     s.columnname = this.ColName.find(item => item.ID == this.selectedcolname).Name;
     s.columnvalue = this.ColValues.find(item => item.Sub_ID == this.selectedcolvalue).ColValue;
     s.attributename = this.attributename;
    
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

  onclose()
  {
    this.triggerfromModel.emit(this._dataService.attributedata);
    this.bsModalRef.hide();
  }

}
