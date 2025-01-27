

import { FormComponent } from "./Formcomponent.ts";
import { TableComponent } from "./Tablecomponent.ts";
import { StateManage } from "./StateManage.ts";
import { BaseComp } from "./BaseComponent.ts";
import { Toast } from "./ToastNotification.ts";
import { CustomEvent } from "./CustomEvent.ts";

// const tableComponent = new TableComponent();
// const formComponent = new FormComponent();
// const stateManage = new StateManage();


export class AppComponent extends BaseComp {
  private static instance: AppComponent;
  protected table: TableComponent;
  protected form: FormComponent;
  protected StateManage: StateManage;
  protected customEvent: CustomEvent;
  protected Toast: Toast;

  private constructor(){
    super();
    this.StateManage = StateManage.getInsTance();
    this.table = TableComponent.getInstance(this.StateManage);
    this.form = FormComponent.getInsTance(this.StateManage);
    this.Toast = new Toast();
    this.customEvent = new CustomEvent(this);
  }


  protected stateManage: StateManage | undefined;

  public static getInstance():AppComponent{
    if(!AppComponent.instance){
      AppComponent.instance = new AppComponent;
    }

    return AppComponent.instance;
  }
  
  // render(): string {
  //   return `
  //         <div id="app-div">
  //         <div id="left">${formComponent.render()}</div>
  //         <div id="right">${tableComponent.render()}</div>
  //         </div>
  //       `
  // }


  render(): string {
    return `
          <div id="app-div">
          <div id="left">
          
          </div>
          <div id="right">
          
          </div>
          </div>
        `
  }
  mount(containerId:string): void {
    super.mount(containerId);
    this.form.mount("left");
    this.table.mount("right");
    // document.getElementById('container')!.classList.add('container');
    // document.getElementById('container')!.innerHTML = this.render();
    // stateManage.formethods();
    this.customEvent.iEListener();
  }
}
