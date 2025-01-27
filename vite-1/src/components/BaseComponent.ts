export abstract class BaseComp{
    abstract render():string;
    mount(containerId:string){
        document.getElementById(containerId)!.innerHTML = this.render();
    }
}