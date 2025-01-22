export class Todo{
    sno : number;
    title: string;
    discr: string;
    active: boolean;
    startTime: string;
    endTime: string;
    date:string;
    constructor(sno: number, title: string, discr: string, active: boolean){
        this.sno = sno;
        this.title = title;
        this.discr = discr;
        this.active = active;
        this.startTime = '';
        this.endTime = '';
        this.date='';
    }

}