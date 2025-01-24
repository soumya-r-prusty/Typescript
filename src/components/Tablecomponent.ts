

export class TableComponent{
    render():string{
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

    

}