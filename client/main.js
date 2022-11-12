const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")

//doge!btns
const dogeBtn = document.querySelector("#dog-btn");
const dogeDiv = document.querySelector("#dog-contain");
const dogePicture = document.createElement("img");
//todolistSelectors
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todoinput");
const todoDisplay = document.querySelector("#todo-display");
//editing todo list info
const editForm = document.querySelector("#edit-todo");
const editInputNum = document.querySelector("#number-input");
const replacement = document.querySelector("#replacement");

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};
//fortune stuff
const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};
const newFortuneBtn = document.getElementById('new-fortune-button')
const addFortune =()=>{
    let fortuneInput = document.getElementById('new-fortune-input')

    let body = {
        fortune: fortuneInput.value
    }

    axios.post("http://localhost:4000/api/fortunes", body)
        .then(res => {
            alert(res.data)
            fortuneInput.value = ''
        })
}
const updateFortuneBtn = document.getElementById('update-fortune-button')
const updateFortune = () => {
    let fortuneIndex = document.getElementById('update-fortune-index')
    let updatedFortuneInput = document.getElementById('update-fortune-input')

    let body = {
        fortune: updatedFortuneInput.value
    }

    axios.put(`http://localhost:4000/api/fortunes/${fortuneIndex.value}`, body)
    .then(res => {
        alert(res.data)
        fortuneIndex.value = '';
        updatedFortuneInput.value = '';
    })
}

const deleteFortuneBtn = document.getElementById('delete-fortune-button')
const deletedFortune = () => {
    let deleteFortuneIndex = document.getElementById('delete-fortune-input')

    axios.delete(`http://localhost:4000/api/fortunes/${deleteFortuneIndex.value}`, body)
    .then(res => {
        alert(res.data)
        fortuneIndex.value = '';
        deleteFortuneInput.value = '';
    })
}

//doge button!
const dogePic = (evt) => {
    evt.preventDefault();
    axios.get("https://dog.ceo/api/breeds/image/random")
    .then((res) => {
      dogeDiv.innerHTML = ' ';
      const dogeUrl = res.data.message;
      dogePicture.src = dogeUrl;
      dogeDiv.appendChild(dogePicture);
      dogePicture.style.border = "5px solid black";
      dogePicture.style.borderRadius = "5px";
      dogePicture.style.width = "250px";
      dogePicture.style.height = "250px";
    });
};

//todoList
const finishTask = (evt) => {
    axios
      .delete(`http://localhost:4000/api/todo/${evt.target.getAttribute("id")}`)
      .then((res) => {
        const [removedEl, todoTask] = res.data;
        console.log(evt.target);
        alert(`${removedEl.task} has been completed! gg!`);
  
        printList(todoTask);
      })
    .catch((err) => console.log(err));
  };
  
const printList = (arr) => {
    todoDisplay.innerHTML = "";
  
arr.forEach((taskObj) => {
    const newLi = document.createElement("li");
    newLi.textContent = taskObj.task;
    newLi.setAttribute("id", taskObj.id);
  
    newLi.addEventListener("click", finishTask);
  
    todoDisplay.appendChild(newLi);
});
};
  
const createTodo = (evt) => {
evt.preventDefault();
const todoText = todoInput.value;
if (!todoText.trim()) {
    alert(`Enter things you need to get done!`);
    return;
}
axios
    .post("http://localhost:4000/api/todo", { task: todoText })
    .then((res) => {
    printList(res.data);
    })
    .catch((err) => console.log(err));
};
  
const editTodoList = (evt) => {
    evt.preventDefault();
  
const body = {
      id: editInputNum.value,
      task: replacement.value,
    };
  
    axios.put("http://localhost:4000/api/todo/id", body).then((res) => {
      printList(res.data);
    });
};

//crypto-dashboard
let btc = document.getElementById("bitcoin");
let eth = document.getElementById("ethereum");
let doge = document.getElementById("dogecoin");
var liveprice = {
    "async": true,
    "scroosDomain": true,
    "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Clitecoin%2Cethereum%2Cdogecoin&vs_currencies=usd",
    "method": "GET",
    "headers": {}
}
$.ajax(liveprice).done(function (response){
    btc.innerHTML = response.bitcoin.usd;
    eth.innerHTML = response.ethereum.usd;
    doge.innerHTML = response.dogecoin.usd;

});


//eventlistens
complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
updateFortuneBtn.addEventListener('click', updateFortune)
deleteFortuneBtn.addEventListener('click', deletedFortune)
//doge
dogeBtn.addEventListener('click', dogePic);
//todo
todoForm.addEventListener("submit", createTodo);
editForm.addEventListener("submit", editTodoList);