textfield = document.getElementById("who");
contentselect = document.getElementById("contentselect");

contentselect.onchange = function(){
    var text = contentselect.options[contentselect.selectedIndex].value
    textfield.value = text;
}
