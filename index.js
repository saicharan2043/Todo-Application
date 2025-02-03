const btnEL = document.getElementById("btnEL")
const ulEL = document.getElementById("un-order")
const inputEl = document.getElementById("input")
const errorMsgEl = document.getElementById("errorMsg")
const saveEl = document.getElementById("save")
console.log(btnEL , 'btnEl')
const getStoreValue = localStorage.getItem("listItems")
let listOfItems = getStoreValue === null ? [] : JSON.parse(getStoreValue)




function ShowTasks(todo) {
    const listItem = document.createElement("li")
    listItem.classList.add("list-item")
    ulEL.appendChild(listItem)
    const checkEl = document.createElement("input")
    checkEl.type = "checkbox"
    checkEl.id = "checkbox" + todo.id
    checkEl.classList.add("check-box")
    checkEl.checked = todo.isTrue
    listItem.appendChild(checkEl)
    const containerOfDltTxt = document.createElement("div")
    containerOfDltTxt.classList.add("text-delete-container")
    listItem.appendChild(containerOfDltTxt)
    const textEl = document.createElement("label")
    textEl.htmlFor = checkEl.id
    textEl.textContent = todo.text
    textEl.classList.add("text-of-action")
    containerOfDltTxt.appendChild(textEl)
    if (todo.isTrue === true) {
        textEl.classList.add("marked")
    } else {
        textEl.classList.remove("marked")
    }
    checkEl.onclick = function() {
        textEl.classList.toggle("marked")
        listOfItems = listOfItems.map((eachValue) => {
            if (eachValue.id === todo.id) {
                return {
                    ...eachValue,
                    isTrue: !eachValue.isTrue
                }
            }
            return eachValue
        })
    }
    const deleteIcon = document.createElement("i")
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    containerOfDltTxt.appendChild(deleteIcon)
    deleteIcon.onclick = function() {
        ulEL.removeChild(listItem)
        listOfItems = listOfItems.filter((eachValue) => eachValue.id !== todo.id)
    }
}


function addItems() {
    let index = 0
    listOfItems.forEach((eachValue) => {
        if (eachValue.id === index) {
            index = eachValue.id + 1
        }
    })
    const inputValue = inputEl.value
    if (inputValue.length !== 0) {
        const todoObject = {
            id: index,
            text: inputValue,
            isTrue: false
        }
        ShowTasks(todoObject)
        inputEl.value = ""
        listOfItems = [...listOfItems, todoObject]
    } else {
        errorMsgEl.textContent = "please Enter action"
    }
}


btnEL.onclick = function() {
    console.log("hello")
    addItems()
}

saveEl.onclick = function() {
    console.log(listOfItems)
    localStorage.setItem("listItems", JSON.stringify(listOfItems))
}


for (let eachValue of listOfItems) {
    ShowTasks(eachValue)
}