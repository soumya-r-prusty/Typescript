export class CustomEvent{
    [x: string]: any;
    private instance : any;

    constructor(instance: any){
        this.instance = instance;
    }

    public iEListener():void{

        document.addEventListener("onEdit",(e:Event)=>{
            this.instance.form.row = (e as unknown as CustomEvent).detail.row;
        });

        document.addEventListener("onToast",(e:Event)=>{
            const{message,action} = (e as unknown as CustomEvent).detail.toastDetail;
            this.instance.Toast.openToast(message,action);
        })
    }
}