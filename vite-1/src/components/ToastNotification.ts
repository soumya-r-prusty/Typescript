export class Toast{
    public openToast(message:string,action:string){
        const toast = document.getElementById("toast");

        if(toast){
            toast.classList.remove("hide");
            if(action == 'safe'){
                toast.style.backgroundColor = "green";
                toast.innerText = message
            }else{
                toast.style.backgroundColor = "red";
                toast.innerText = message;
            }

            setTimeout(()=>{
                toast.innerText = "";
                toast.classList.add("hide");
            },3000)
        }
    }
}