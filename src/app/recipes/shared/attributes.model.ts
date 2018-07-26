export class ColumnName {  
    constructor(public ID: number, public Name: string) { }  
  }  

  export class ColumnValue {  
    constructor(public Sub_ID: number, public ID: number, public ColValue: string) { }  
  }

  export class AttributeValues{
    id:number;
    attributename:string;
    columnname:string;
    columnvalue:String;
    orandoperned:string;

    constructor() 
    {
      
     }  

  }