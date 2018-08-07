import { Injectable } from '@angular/core';

@Injectable()
export class CustomdataService {
  private selectedcolname;
  
  constructor() { }

setData(colname) {
    this.selectedcolname = colname;
}
getData() {
    return this.selectedcolname;
}

}
