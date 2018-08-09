import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr'
import { NewattributeService } from '../../shared/newattribute.service';
import { CustomdataService } from '../../shared/customdata.service';
import { Columnnamevalue } from '../../shared/columnnamevalue.model';

@Component({
  selector: 'app-newrecipe',
  templateUrl: './newrecipe.component.html',
  styleUrls: ['./newrecipe.component.css']
})
export class NewrecipeComponent implements OnInit {  

  @Output() triggerfromModel = new EventEmitter(); 
  attributename:string;
  selectedcolvalue:string;
  selectedItems = [];
  dropdownSettings = {};
  constructor(public bsModalRef: BsModalRef, public newattriServ: NewattributeService, private customdataService:CustomdataService
              ,private toastr: ToastrService) {   
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
   
}
OnItemDeSelect(item:any){
    
}
onSelectAll(items: any){
   
}
onDeSelectAll(items: any){
 
}

Save()
{

if(this.attributename==null)
{
  this.toastr.warning("Please select attribute name");
}
else
if(this.selectedItems.length==0)
{
  this.toastr.warning("Please select attribute values");
}
else{
    this.selectedcolvalue =  this.customdataService.getData() + '|' +this.attributename;
    this.newattriServ.saveNewAttribute(this.selectedItems, this.selectedcolvalue).subscribe(data => {   
    this.toastr.success('New Record Added Succcessfully', 'Recipe Register');
    })
  }
}
  onclose()
  { 
    this.triggerfromModel.emit(this.attributename);
    this.bsModalRef.hide();
  }

}
