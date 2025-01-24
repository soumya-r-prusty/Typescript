


export class FormComponent {



  render(): string {
    return `<div id="form-container">
              <header>Registration Form</header>
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
                 </div>
                  <div id="input-div">
                    <button type="submit" id="submit">Submit</button>
                 </div> </form>
       </div>`
  }


  
  // formSubmit(e:Event):void{
  //     e.preventDefault();
  //     this.insertRow(this.getData());
  //     // const formData = formComp.getData();
  //     // const insertRow = tableComp.insertRow(formData);
   
    
  // }

  insertRow(Data:{[key: string]:any}):void{
    const table = document.getElementById('table') as HTMLTableElement;
 
    const tableRow = table.insertRow();
    
    for(const key in Data){
      const cell = document.createElement('td');
      cell.textContent = Data[key].toString();
      tableRow.appendChild(cell);
    }

    const editButton = document.createElement('button');
    const cell1 = document.createElement('td');
    cell1.appendChild(editButton);
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    tableRow.appendChild(cell1);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    tableRow.appendChild(deleteButton);
   
}



}






