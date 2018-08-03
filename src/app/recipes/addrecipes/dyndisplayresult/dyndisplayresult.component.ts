import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dyndisplayresult',
  templateUrl: './dyndisplayresult.component.html',
  styleUrls: ['./dyndisplayresult.component.css']
})
export class DyndisplayresultComponent implements OnInit {

  @Input() tableHeads: Array<String> = new Array<String>();
  @Input() tableDatas: Array<any> = new Array<any>();
  @Input() tableColName: Array<String> = new Array<String>();
  private tableColNameGenerated: Array<String> = new Array<String>();
  private isTableColNameSet: Boolean = false;

  constructor() { }

  ngOnInit() { 
  
  } 

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableHeads']) {
      if (this.tableHeads.length > 0) {
        // console.log('tableHeads');
      }
    }

    if (changes['tableDatas']) {
      if (!this.isTableColNameSet) {
        if (this.tableDatas.length > 0) {
          this.tableColNameGenerated = this.tableHeads; //this.getKeys(this.tableDatas[0]);         
         // if (!this.isHeadAndColLengthSame(this.tableHeads, this.tableColNameGenerated)) {
          //  console.error('Table column row is not same as with property name in self generated');
         //}
        }
      }
    }

    if (changes['tableColName']) {
      if (this.tableColName.length > 0) {
        this.tableColNameGenerated = this.tableColName;
        this.isTableColNameSet = true;
        if (!this.isHeadAndColLengthSame(this.tableHeads, this.tableColName)) {
          console.error('Table column row is not same as with property name provided');
        }
      }
    }
  }

  /**
  * This method will fetch all the property name and convert it into a list of String.
  * @param {Array<String>} head Pass in the list of String, which contains table header values
  * @param {Array<String>} col Pass in the list of String, which contains column property 
  * name, which was received from Input or generated using this.getKeys()
  */
  private isHeadAndColLengthSame(head: Array<String>, col: Array<String>): Boolean {
    return (head.length === col.length);
  }

  /**
  * This method will fetch all the property name and convert it into a list of String.
  * @param {any} value Pass Instance of Object eg. new User()
  */
  private getKeys(value: any): Array<String> {
    return Object.keys(value);
  }

}
