

import { BaseComp } from "./BaseComponent.ts";
import { StateManage } from "./StateManage.ts";

export class FormComponent extends BaseComp{

  private static instance:FormComponent;
  protected stateManager!: StateManage;

  public row:any;
  public isValid!: boolean;

  constructor(stateManager:StateManage){
    super();
    this.stateManager = stateManager;
    this.row = null;
    this.isValid  = true;
    console.log('isValid');
  }

                
  public static getInsTance(stateManager:StateManage):FormComponent{
     if(!FormComponent.instance){
      FormComponent.instance = new FormComponent(stateManager);
     }
     return FormComponent.instance;
  }


  render(): string {
    return `<div id="form-container">
              <header>Registration Form</header>
              <div id=""toast" class="hide snackbar"></div>
             <form id="form">
                 <div id="tab">
                 <div id="input-div">
                   <label for="Name">Name</label>
                   <input type="text" id="Name" name="Name" class="Name" placeholder="Name">
                 </div>
                   <div id="input-div">
                   <label for="Email">Email</label>
                   <input type="email" id="Email" name="Email" class="Email" placeholder="Email">
                 </div> 
                  <div id="input-div">
                   <label for="PhoneNumber">Phone Number</label>
                   <input type="number" id="PhoneNumber" name="PhoneNumber" class="PhoneNumber" placeholder="PhoneNumber">
                 </div>
                  <div id="input-div">
                   <label for="city">City/Village</label>
                   <input type="text" id="city" name="city" class="city" placeholder="city">
                 </div> <div id="input-div">
                   <label for="district">District</label>
                   <input type="text" id="district" name="district" class="district" placeholder="district">
                 </div> <div id="input-div">
                   <label for="postcode">Post Code</label>
                   <input type="text" id="postcode" name="postcode" class="postcode" placeholder="Postcode">
                 </div>
                  <div id="input-div">
                   <label for="password">Password</label>
                   <input type="password" id="password" name="password" class="password" placeholder="password">
                   <i class="far id=""toggle> </i>
                 </div> <div id="input-div">
                   <label for="postcode">Confirm Password</label>
                   <input type="password" id="" name="c-password" class="c-password" placeholder="confirm-password">
                 </div>
                 </div>
                  <div id="input-div">
                    <button type="submit" id="submit">Submit</button>
                 </div> </form>
       </div>`
  }


  mount(containerId: string): void {
    super.mount(containerId);
    document.getElementById('form')!.addEventListener('submit',(event)=>{
      this.handleSubmit(event);
    })
    this.hValidation();
  }

  handleSubmit(event:Event):void{

    this.validationBS();
    
    event.preventDefault();
    const name =(document.getElementById("Name") as HTMLInputElement).value;
    const email =(document.getElementById("Email") as HTMLInputElement).value;
    const phone =(document.getElementById("PhoneNumber") as HTMLInputElement).value;
    
    // console.log(name,'',email,'',phone);

    const submit = (document.getElementById('submit') as HTMLElement);

    // console.log(submit);
    if(this.isValid){
      if(this.row == null){
      console.log(this.row);
        this.stateManager.setFormData({name,email,phone});
        const formData = this.stateManager.getData();
        // console.log(formData[0]);
        this.insertRow(formData);
      }else if(submit.innerText == "Edit"){
      // console.log(this.row);
      console.log("update");

      const cells = this.row.getElementByTagName('td');

      const formData = this.stateManager.getFormData();

      const obj = formData.find((fData)=>fData.phone === cells[2].innerText);

      const index = obj?formData.indexOf(obj): -1;

      formData[index] = {name,email,phone};

      cells[0].innerText = name;
      cells[1].innerText = email;
      cells[2].innerText = phone;

      console.log("update");
      submit.innerText = "Submit";
      this.row = null;

    }

    this.isValid = true;
    
    const resetForm = <HTMLFormElement>document.getElementById("form");
    resetForm.reset();
  }else{
    this.toastCustomEvent("Enter all fields before submission","danger");
  }

  }

  toastCustomEvent(messsage:string,action:string):void{
    const toast = {messsage:messsage,action:action};
    document.dispatchEvent(new CustomEvent("onToast",{detail:{toast}}));
  }

validationBS():void{
 document.dispatchEvent(new CustomEvent("validation"));
}

hValidation():void{
  const input = document.querySelectorAll<HTMLInputElement>('#form input');

  input.forEach(input => {
    input.addEventListener('blur',() => {
      this.validationBlur({field:input.name, value: input.value});
    })
  })

}
validationBlur(details: {field:string, value:string}){
  document.dispatchEvent(new CustomEvent("onBValidation",{detail:{details}}));
}


// insertData(formData:Object):void{
//   console.log(formData);
//   // const form = (document.getElementsByTagName('table') as HTMLTableElement).COMMENT_NODE
// }


  insertRow(formDataa:Object):void{
    const table = document.getElementById('table') as HTMLTableElement;
 
    const tableRow = table.insertRow();
    // console.log(typeof(formDataa));
    
    Object.keys(formDataa).forEach(key=>{
     const cell = tableRow.insertCell();
     cell.innerText = formDataa[key];
    })

    const editButton = document.createElement('button');
    editButton.setAttribute('id','edit');
    const cell1 = document.createElement('td');
    cell1.appendChild(editButton);
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    tableRow.appendChild(cell1);
  
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('id','delete');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    tableRow.appendChild(deleteButton);
   
}


// onEdit(event:Event): void {
//   const clickedButton = event.target as HTMLButtonElement;

//   const clickedRow = clickedButton.closest('tr');

//   (document.getElementById('Name') as HTMLInputElement).value = ""+clickedRow?.cells[0].textContent?.toString();
//   (document.getElementById('Email') as HTMLInputElement).value = ""+clickedRow?.cells[1].textContent?.toString();
//   (document.getElementById('PhoneNumber') as HTMLInputElement).value = ""+clickedRow?.cells[2].textContent?.toString();

//   const buttons = document.getElementById('submit') as HTMLButtonElement;
//   buttons.innerText = "Update";

// }




  }
