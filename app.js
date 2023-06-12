//selectors:
const input =document.querySelector("#input");
const btn =document.querySelector("#btn");
const ul =document.querySelector("ul");
const temizleBtn =document.querySelector("#temizle-btn");

//functions
function domaYaz({ id, text }) {
    ul.innerHTML += ` <li id=${id} class ='innerlist'> <i class="fa fa-check"></i><span>${text}</span><i class="fa fa-trash"></i></li>`;
  }

let tasks = [] ;

btn.addEventListener("click" , () => {
    if(!input.value){
        alert("Please enter your todo");
    }else{
        const task = {
            id: new Date().getTime(),
            text:input.value,
        };
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        domaYaz(task);
        input.value ="";
        input.focus();
    }
    // console.log(tasks);
})

window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      btn.click();
    }
  });

ul.addEventListener("click" ,(e)=> {
    const id = e.target.parentElement.id;
    if(e.target.classList.contains("fa-trash")) {
        tasks = tasks.filter((task) =>task.id !=id); //?cöp kutusuna tiklanan li nin arrayden atilma islemi
        localStorage.setItem("tasks", JSON.stringify(tasks));
        e.target.parentElement.remove();
    }

    e.target.parentElement.classList.toggle("checked")
});



window.addEventListener("load", () => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      domaYaz(task);
    });
  });


//? temizle butonına basildigi zaman calis
temizleBtn.addEventListener("click", () => {
    localStorage.clear()          //? local straoge'daki tüm verileri sil
    //   ul.style.display= "";
    window.location.reload();
    });
