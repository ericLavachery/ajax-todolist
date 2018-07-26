function createNameList() {
    var namesList = '<option></option>';
    var todosClone = todos.slice(0);
    todosClone.sort(sortOn("who"));
    for (var i = 0; i < todosClone.length; i++) {
        var todoItem = todosClone[i].who;
        if (todoItem != oldItem) {
            namesList = namesList + '<option value="' + todoItem + '">' + todoItem + '</option>';
        }
        var oldItem = todosClone[i].who;
    }
    document.getElementById("contentselect").innerHTML = namesList;
}

textfield = document.getElementById("who");
contentselect = document.getElementById("contentselect");

contentselect.onchange = function(){
    var text = contentselect.options[contentselect.selectedIndex].value
    textfield.value = text;
}
