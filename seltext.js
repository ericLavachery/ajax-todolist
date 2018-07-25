function createNameList() {
    var namesList = '<option></option>';
    todos.sort(sortOn("who"));
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i].who;
        if (todoItem != oldItem) {
            namesList = namesList + '<option value="' + todoItem + '">' + todoItem + '</option>';
        }
        var oldItem = todos[i].who;
    }
    document.getElementById("contentselect").innerHTML = namesList;
}

textfield = document.getElementById("who");
contentselect = document.getElementById("contentselect");

contentselect.onchange = function(){
    var text = contentselect.options[contentselect.selectedIndex].value
    textfield.value = text;
}
