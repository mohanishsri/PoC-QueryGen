import { Injectable } from '@angular/core';

@Injectable()
export class CustomdataService {
  private selectedcolname;
  private id;
  
  constructor() { }

setData(colname) {
    this.selectedcolname = colname;
}
getData() {
    return this.selectedcolname;
}


setId(id) {
    this.id = id;
}
getId() {
    return this.id;
}

}
