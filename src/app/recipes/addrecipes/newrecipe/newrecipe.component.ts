import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-newrecipe',
  templateUrl: './newrecipe.component.html',
  styleUrls: ['./newrecipe.component.css']
})
export class NewrecipeComponent implements OnInit {
  @Output() triggerfromModel = new EventEmitter(); 
  attributename:string;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {

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
    console.log(this.attributename);
    this.triggerfromModel.emit(this.attributename);
    this.bsModalRef.hide();
  }

}
