
import { FormComponent } from "./Formcomponent.js";

const formComponent = new FormComponent();

export class StateManage {

    public formDataa: {[key: string]: string} = {};

    getData(): Object {

        const name = (document.getElementById('Name') as HTMLInputElement).value;
        const email = (document.getElementById('Email') as HTMLInputElement).value;
        const phoneNumber = (document.getElementById('PhoneNumber') as HTMLInputElement).value;

        // console.log(name);
        const formData = {
            Name: name,
            Email: email,
            PhoneNumber: phoneNumber
        }
        return formData;
    }

    formMethod():string{
        const buttons = document.getElementById('submit') as HTMLButtonElement;

        return buttons.innerText;
    }

    formethods(): void {
        let form = document.getElementById("form") as HTMLFormElement;

        form.addEventListener('submit', (e) => this.formSubmit(e));
        // this.formMethod();
        
    }
    formSubmit(e: Event): void {
        
        e.preventDefault();
        
        const textButton = this.formMethod();
        if(textButton === 'Submit'){
            this.insertRow(this.getData());
            this.resetForm();
        }else{
            this.onUpdate();
        }
        
        console.log(textButton);
    }

    insertRow(Data: { [key: string]: any }): void {
        const table = document.getElementById('table') as HTMLTableElement;

        const tableRow = table.insertRow();

        for (const key in Data) {
            const cell = document.createElement('td');
            cell.textContent = Data[key].toString();
            tableRow.appendChild(cell);
        }

        const editButton = document.createElement('button');
        editButton.addEventListener("click", this.onEdit);

        const cell1 = document.createElement('td');
        cell1.appendChild(editButton);
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        tableRow.appendChild(cell1);

        const deleteButton = document.createElement('button');
        deleteButton.addEventListener("click",this.onDelete);
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        tableRow.appendChild(deleteButton);

    }

    resetForm():void{
        const form = document.getElementById('form') as HTMLFormElement;
        form.reset();
    }
    getRow(tablerow:number):number{
       return tablerow;
    }
    onEdit(event:Event): void {
        const clickedButton = event.target as HTMLButtonElement;

        const clickedRow = clickedButton.closest('tr');

        (document.getElementById('Name') as HTMLInputElement).value = ""+clickedRow?.cells[0].textContent?.toString();
        (document.getElementById('Email') as HTMLInputElement).value = ""+clickedRow?.cells[1].textContent?.toString();
        (document.getElementById('PhoneNumber') as HTMLInputElement).value = ""+clickedRow?.cells[2].textContent?.toString();

        const buttons = document.getElementById('submit') as HTMLButtonElement;
        buttons.innerText = "Update";

        const clickedRowIndex = clickedRow!.rowIndex;
        // console.log(clickedRowIndex);
        // // this.onUpdate(clickedRowIndex);
        this.getRow(clickedRowIndex);
    }

    onDelete(e:Event):void{
        const deleteButton = e?.target as HTMLButtonElement;
        const clickedRow = deleteButton.closest('tr');
        console.log(clickedRow);
        clickedRow?.remove();
        const form = document.getElementById('form') as HTMLFormElement;
        form.reset();
    }

    onUpdate():void{
        const index = document.querySelectorAll('tr');
        // const sele
        console.log(index);

        const buttons = document.getElementById('submit') as HTMLButtonElement;
        buttons.innerText = "Submit";
    }

}