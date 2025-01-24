

import { FormComponent } from "./Formcomponent.js";
import { TableComponent } from "./Tablecomponent.js";
import { StateManage } from "./StateManage.js";


const tableComponent = new TableComponent();
const formComponent = new FormComponent();
const stateManage = new StateManage();


export class AppComponent {
  render(): string {
    return `
          <div id="app-div">
          <div id="left">${formComponent.render()}</div>
          <div id="right">${tableComponent.render()}</div>
          </div>
        `
  }

  mount(): void {
    document.getElementById('container')!.classList.add('container');
    document.getElementById('container')!.innerHTML = this.render();
    stateManage.formethods();
  }
}
