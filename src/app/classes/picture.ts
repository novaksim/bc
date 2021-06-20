export class Picture {

  id:string;
  name:string;
  type:string;
  data: any;


  constructor(id: string, name: string, type: string, data: any) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.data = data;
  }
}
