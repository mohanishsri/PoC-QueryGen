import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import { NewattributeService } from '../../shared/newattribute.service';
import { CustomdataService } from '../../shared/customdata.service';

@Component({
  selector: 'app-newrecipe',
  templateUrl: './newrecipe.component.html',
  styleUrls: ['./newrecipe.component.css']
})
export class NewrecipeComponent implements OnInit {  

  @Output() triggerfromModel = new EventEmitter(); 
  attributename:string;
  selectedItems = [];
  dropdownSettings = {};
  constructor(public bsModalRef: BsModalRef, public newattriServ: NewattributeService, private customdataService:CustomdataService) {   
    this.newattriServ.getColumnValues(this.customdataService.getData());
   }

  ngOnInit() {       
    
    this.dropdownSettings = { 
    singleSelection: false, 
    text:"Select Columns",
    selectAllText:'Select All',
    unSelectAllText:'UnSelect All',
    enableSearchFilter: true,
    classes:"myclass custom-class"
  }; 

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

  onclose()
  {    
    this.triggerfromModel.emit(this.attributename);
    this.bsModalRef.hide();
  }

}
