console.log("Script was connected");

class Item {
    static id = 0;
    constructor(title, dueDate, description, done) {
        if (typeof title === 'object') {
            Object.assign(this, title);
            this.id = Item.getId();
        }else{
        this.title = title;
        dueDate === '' ? this.dueDate = undefined : this.dueDate = dueDate;;
        this.description = description;
        done === undefined ? this.done = false : this.done = done;
        this.id = Item.getId()
        }
    } 
    static getId(){
        Item.id = Item.id + 1;
        return Item.id;
    }
}

let tasks = [];
let milk = new Item('Buy milk', new Date(2021, 3, 20), "Buy milk, 400ml, 2,5%, korivka", true);

tasks.push(milk);
tasks.push(new Item('Buy car', "", "Buy new Toyota supra :)", false));
tasks.push(new Item('Win the math', new Date(2021, 2, 20), "",false));
tasks.push(new Item('Win the math', new Date(2021, 5, 20), "win the volleyball match", false));
tasks.push(new Item('New PC', new Date(2021, 4, 19), "Buy new laptop(Lenovo ThinkPad X440) 16:CRM", false));
tasks.push(new Item('Win the math', new Date(2021, 2, 19), "win the futball match", true));

const sectionTask = document.getElementById('tasks');
// getAllTask()

const taskForm = document.forms['taskForm'];
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formItemData = new FormData(taskForm);
    const objectItem = Object.fromEntries(formItemData.entries());
    if (!(objectItem.dueDate === '')) {
        objectItem.dueDate = new Date(objectItem.dueDate);
    }
    let item = new Item(objectItem);
    fetch("http://localhost:5000/lists/1/tasks", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(item)
  })
    appendItem(item);
    taskForm.reset();
}) 

function clearSection() {
    sectionTask.innerHTML = "";
}

function getAllTask() {
    document.getElementById("task-mod-1").checked = true;
    clearSection();
    // tasks.forEach(appendItem);
    fetch("http://localhost:5000/tasks",)
        .then(response => response.json())
        .then(responce_tasks => responce_tasks.forEach(appendItem));
}

function getAllNotDoneTask() {
    document.getElementById("task-mod-2").checked = true;
    clearSection();
    fetch("http://localhost:5000/tasks",)
        .then(response => response.json())
        .then(responce_tasks => responce_tasks.forEach(appendItem));
    // tasks.forEach(function(item, index, array) {
    //     if (item.done === false) {
    //         appendItem(item);
    //     }
    // });
}

function removeItem(_target, _section) {
    if (_target.tagName === "BUTTON") {
        _section.remove();
        let sectionId = _section.id.slice(6);
        tasks.forEach(function(item, index, array) {
            if (item.id == sectionId) {
                array.splice(index, 1);
                console.log(tasks)
            }
        });
        
    }
}

function checkDateItem(date) {
    return (date > new Date());
}

function SetDoneByCheckBox(_event) {
    console.log(_event.target.checked);
    let sectionId = _event.target.closest("SECTION").id.slice(6);
    tasks.forEach(function(item, index, array) {
        if (item.id == sectionId) {
            _event.target.checked ? item.done = true : item.done = false;
            if (document.getElementById("task-mod-2").checked) {
                getAllNotDoneTask();
            }
            else{
                getAllTask()
            }
        }
    });
}

function appendItem(item) {
    let result;
    if (item.done === true) {
        result = `<section id="title-${item.id}" onclick="removeItem(event.target,this)" class="item item-done"><p class="done-task"><input type="checkbox" checked onclick="SetDoneByCheckBox(event)"> </input>`;
    } else {
        result = `<section id="title-${item.id}" onclick="removeItem(event.target,this)" class="item"><p><input type="checkbox" onclick="SetDoneByCheckBox(event)"> </input>`;
    }
    result += ` <span class = "title"> ${item.title } </span>`;
    let date;
    if (!(item.dueDate === '')) {
        item.dueDate = new Date(item.dueDate);
    }
    if (item.dueDate === undefined || item.dueDate ==="") {
        date = null;
    } else {
        date = item.dueDate.toString().split(' ');
    }
    if (!checkDateItem(item.dueDate) && !(date === null)) {
        result += ` - <span class="date-not-correct">${date[1]} - ${date[2]} - ${date[3]}</span>`;
    } else if (checkDateItem(item.dueDate) && !(date === null)) {
        result += ` - <span class="date-correct">${date[1]} - ${date[2]} - ${date[3]}</span>`;
    }
    result += `<button class="button-delete">Delete</button>`;

    if (!(item.description === undefined)) {
        result += `<p class="description"> ${ item.description } </p>`;
    }
    result += `</section>`;
    sectionTask.innerHTML += result;
}


