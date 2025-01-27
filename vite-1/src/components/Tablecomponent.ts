
import { BaseComp } from "./BaseComponent.ts";
import { StateManage } from "./StateManage.ts";


export class TableComponent extends BaseComp{

   private static instance:TableComponent;

   protected stateMan: StateManage;


   constructor(stateManag: StateManage){

    super();
    this.stateMan = stateManag;
    // console.log("state Manager");
   }

   public static getInstance(stateMan:StateManage){
    if(!TableComponent.instance){
      TableComponent.instance = new TableComponent(stateMan);
    }
    
    return TableComponent.instance;
   }




    render():string{

       const formData = this.stateMan.getFormData();

      //  console.log(formData,this.render);
      //  console.log(formData);
      // this.insertRow();
        return `
         <div id="table-div" style="height:100%;border: 1px solid red"> 
          <table style="width:100%;border:1px solid black" id="table"> 
             <caption>Details</caption>
             <tbody>
               <tr>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Phone</th>
               </tr>
             </tbody>

          </table>
         </div>
        `;
    }

    mount(containerId: string): void {
      super.mount(containerId);

      document.getElementById("right")?.addEventListener('click',(e)=>{
        const target = e.target as HTMLElement;

        // console.log(target);
        if(target.id === 'edit'){
          this.handleEdit(target);
        }
        else if(target.id === 'delete'){
          this.handleDelete(target);
        }
      })
    }

    handleEdit(element: HTMLElement):void{
         const row = element.closest('tr');
         if(row){
          const cells = row.getElementsByTagName('td');
          console.log(cells);
          (document.getElementById('Name') as HTMLInputElement).value = cells[0].innerText;
          (document.getElementById('Email') as HTMLInputElement).value = cells[1].innerText;
          (document.getElementById('PhoneNumber') as HTMLInputElement).value = cells[2].innerText;
          (document.getElementById('submit') as HTMLInputElement).innerText = "Edit";

          // console.log(document.getElementById('Name') as HTMLInputElement);
          // this.buttonEdit(row);

          // const submit = (document.getElementById('submit') as HTMLFormElement);
         }
    }
    buttonEdit(row:any){
        
    }

    handleDelete(element:Element){
       const row = element.closest('tr');
       const formData = this.stateMan.getFormData();

       if(row){
        
        const cells = row.getElementsByTagName('td');
        const emailDetails = cells[1].innerText;

        const objIndex = formData.findIndex((pep:{name:string,email:string,phone:string})=>{
          return pep.email === emailDetails;
        })

        if(objIndex !== -1){
          formData.splice(objIndex,1);
        }

       const tableBody = row?.parentElement;
       tableBody?.removeChild(row);

       const resetForm = <HTMLFormElement>document.getElementById("form");
       resetForm.reset();
       }
    }

    toastCustomE(message:string,action:string){
      const detail = {message:message,action:action}
      document.dispatchEvent(new CustomEvent('onToast',{detail:{detail}}));
    }
    
}