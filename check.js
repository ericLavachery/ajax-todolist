function toggleCheck(boxId) {
    // todos.sort(sortOn("who"));
    var checkStatus = todos[boxId].done;
    console.log(checkStatus);
    if (checkStatus === true) {
        var newCheckStatus = false;
    } else {
        var newCheckStatus = true;
    }
    console.log(newCheckStatus);
    todos[boxId].done = newCheckStatus;
    console.log(todos[boxId].done);
    saveCheckData();
    var recCheck = document.getElementById("recCheck");
    recCheck.innerHTML = '<button onclick="window.location.reload()">Record changes</button>';
}

function saveCheckData() {
    var todoJSON = JSON.stringify(todos);
    console.log(todoJSON);
    var request = new XMLHttpRequest();
    var URL = "save.php?data=" + encodeURI(todoJSON);
    request.open("POST", URL);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    // request.overrideMimeType("text/plain");
    request.send();
}
