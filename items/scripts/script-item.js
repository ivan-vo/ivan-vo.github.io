console.log("Script was connected");

class Item {
    constructor(id, title, dueDate, done, description) {
        this.title = title;
        dueDate === '' ? this.dueDate = undefined : this.dueDate = dueDate;;
        this.description = description;
        done === undefined ? this.done = false : this.done = done;
        this.id = id;
    }
}

let tasks = [];
let milk = new Item(1, 'Buy milk', new Date(2021, 3, 20), true, "Buy milk, 400ml, 2,5%, korivka");

tasks.push(milk);
tasks.push(new Item(2, 'Buy car', "", false, "Buy new Toyota supra :)"));
tasks.push(new Item(3, 'Win the math', new Date(2021, 2, 20), false));
tasks.push(new Item(4, 'Win the math', new Date(2021, 5, 20), false, "win the volleyball match"));
tasks.push(new Item(5, 'New PC', new Date(2021, 4, 19), false, "Buy new laptop(Lenovo ThinkPad X440) 16:CRM"));
tasks.push(new Item(6, 'Win the math', new Date(2021, 2, 19), true, "win the futball match"));

const sectionTask = document.getElementById('tasks');
getAllTask()

function clearSection() {
    sectionTask.innerHTML = "";
}

function getAllTask() {
    clearSection();
    tasks.forEach(appendItem);
}

function getAllNotDoneTask() {
    clearSection();
    tasks.forEach(function(item, index, array) {
        if (item.done === false) {
            appendItem(item);
        }
    });
    notDoneTasks.forEach(appendItem);
}

function removeItem(_target, _section) {
    if (_target.tagName === "BUTTON") {
        _section.remove();
        let sectionId = _section.id.slice(6);
        tasks.forEach(function(item, index, array) {
            if (item.id == sectionId) {
                array.splice(index, 1);
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
    if (item.dueDate === undefined) {
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