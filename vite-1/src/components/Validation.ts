export class validation{
    private validationrules:{
        [key: string]:RegExp
    } = {
        name:/^[a-zA-Z\s]+$/,
        email:/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        phone: /^[0-9]{10}$/,
    };

    private errorMessage: { [key:string]:string} = {
        name:"Name must contains only letters and spaces",
        email:"please enter a valid email",
        phone:"phone number must e of 10 digits"
    };

    validateField(field:string,value:string):boolean{
        const isValid = this.validationrules[field]?.test(value);

        this.showMessage(field,isValid);
        return isValid;
    }

    private showMessage(field:any, isValid:boolean):void{
        const errorElement = (document.createElement('span') as HTMLElement);
        const parent = field.parentElement.parentElement;
        parent.appendChild(errorElement);
        if(parent){
            if(!isValid){
                errorElement.textContent = this.errorMessage[field];
                setTimeout(()=>{
                    errorElement.textContent = "";
                },3000);
            }else{
                errorElement.textContent = "";
            }
        }
    }

}