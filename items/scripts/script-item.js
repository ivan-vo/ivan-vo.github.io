console.log("Script was connected");
class Item {
    constructor(title, dueDate, done, description) {
        this.title = title;
        dueDate === '' ? this.dueDate = undefined : this.dueDate = dueDate;;
        this.description = description;
        done === undefined ? this.done = false : this.done = done;
    }
}
let tasks = [];
let milk = new Item('Buy milk', new Date(2021, 3, 20), true, "Buy milk, 400ml, 2,5%, korivka");
tasks.push(milk);
tasks.push(new Item('Buy car', "", false, "Buy new Toyota supra :)"));
tasks.push(new Item('Win the math', new Date(2021, 2, 20), false, "win the volleyball match"));
tasks.push(new Item('Win the math', new Date(2021, 5, 20), false, "win the volleyball match"));
tasks.push(new Item('New PC', new Date(2021, 4, 19), false, "Buy new laptop(Lenovo ThinkPad X440) 16:CRM"));
tasks.push(new Item('Win the math', new Date(2021, 2, 19), true, "win the futball match"));
const sectionTask = document.getElementById('tasks');
tasks.forEach(appendItem);

function appendItem(item) {

    let result = item.done === true ? '<section class="item item-done"><p class="done-task"><input type="checkbox" checked> </input>' : '<section class="item"><p><input type="checkbox"> </input>';
    result += ` <span class = "title" > ${item.title } </span>`;
    let date = item.dueDate === undefined ? null : item.dueDate.toString().split(' ');
    if (!checkDateItem(item.dueDate) && !(date === null)) {
        result += ` - <span class="date-not-correct">${date[1]} - ${date[2]} - ${date[3]}</span>`;
    } else if (checkDateItem(item.dueDate) && !(date === null)) {
        result += ` - <span class="date-correct">${date[1]} - ${date[2]} - ${date[3]}</span>`;
    }
    result += item.description === undefined ? '' : `<p class="description"> ${ item.description } </p>`;
    result += `</section>`;
    sectionTask.innerHTML += result;
}

function checkDateItem(date) {
    return (date > new Date());
}