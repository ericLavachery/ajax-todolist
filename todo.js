function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

function showDate(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    var show = [day, month].join('/');
    if (formatDate(d) == formatDate(Date())) {
        show = '<span class="rouge">today</span>';
    } else if (formatDate(d) < formatDate(Date())) {
        show = '<span class="gris">too late</span>';
    }
    return show;
}

function Todo(task, who, dueDate) {
    this.task = task;
    this.who = who;
    this.dueDate = dueDate;
    this.done = false;
}

var todos = new Array();

window.onload = init;

function init() {
    var submitButton = document.getElementById("submit");
    submitButton.onclick = getFormData;
    getTodoData();
}

function getTodoData() {
    var request = new XMLHttpRequest();
    request.open("POST", "todo.json");
    request.onreadystatechange = function() {
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText) {
                parseTodoItems(this.responseText);
                addTodosToPage();
                createNameList();
            }
            else {
                console.log("Error: Data is empty");
            }
        }
    };
    // request.overrideMimeType("text/plain");
    request.send();
}

function parseTodoItems(todoJSON) {
    if (todoJSON == null || todoJSON.trim() == "") {
        return;
    }
    var todoArray = JSON.parse(todoJSON);
    if (todoArray.length == 0) {
        console.log("Error: the to-do list array is empty!");
        return;
    }
    for (var i = 0; i < todoArray.length; i++) {
        var todoItem = todoArray[i];
        todos.push(todoItem);
    }
}

function sortOn(property){
    return function(a, b){
        if(a[property] < b[property]){
            return -1;
        }else if(a[property] > b[property]){
            return 1;
        }else{
            return 0;
        }
    }
}

function addTodosToPage() {
    todos.sort(sortOn("dueDate"));
    // affiche todolist
    var todoHtml = document.getElementById("todoList");
    var newLine = '';
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        if (todoItem.done === false) {
            var kol = 'noir';
            if (todoItem.dueDate == formatDate(Date())) {
                kol = 'rouge';
            } else if (todoItem.dueDate < formatDate(Date())) {
                kol = 'gris';
            }
            newLine = newLine + '<input type="checkbox" name="' + i + '" value="yes">';
            newLine = newLine + '<span class="tasklist">' + '<span class="bleu">' + todoItem.who + ' :</span> <span class="' + kol + '">' + todoItem.task + ' (' + showDate(todoItem.dueDate) + ')</span>' + '</span><br>';
        }
    }
    todoHtml.innerHTML = newLine;
    // affiche donelist
    var doneHtml = document.getElementById("doneList");
    var newLine = '';
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        if (todoItem.done === true) {
            var kol = 'gris';
            newLine = newLine + '<input type="checkbox" name="' + i + '" value="yes">';
            newLine = newLine + '<span class="tasklist">' + '<span class="gris">' + todoItem.who + ' :</span> <span class="' + kol + '">' + todoItem.task + '</span>' + '</span><br>';
        }
    }
    doneHtml.innerHTML = newLine;
}

function getFormData() {
    var task = document.getElementById("task").value;
    if (checkInputText(task, "Please enter a task")) return;
    var who = document.getElementById("who").value;
    if (checkInputText(who, "Please enter a person to do the task")) return;
    var date = document.getElementById("dueDate").value;
    if (checkInputText(date, "Please enter a due date")) return;
    var todoItem = new Todo(task, who, date);
    todos.push(todoItem);
    addTodoToPage(todoItem);
    saveTodoData();
}

function checkInputText(value, msg) {
    if (value == null || value == "") {
        alert(msg);
        return true;
    }
    return false;
}

function addTodoToPage(todoItem) {
    var newHtml = document.getElementById("newItem");
    var kol = 'vert';
    var newLine = '<span class="vert">NEW ENTRY : </span>';
    newLine = newLine + '<span class="tasklist">' + '<span class="bleu">' + todoItem.who + ' :</span> <span class="' + kol + '">' + todoItem.task + ' (' + showDate(todoItem.dueDate) + ')</span></span><br>';
    newHtml.innerHTML = newLine;
    document.forms[0].reset();
}

function saveTodoData() {
    var todoJSON = JSON.stringify(todos);
    var request = new XMLHttpRequest();
    var URL = "save.php?data=" + encodeURI(todoJSON);
    request.open("POST", URL);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    // request.overrideMimeType("text/plain");
    request.send();
}
