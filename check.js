function toggleCheck(boxId) {
    var checkStatus = todos[boxId].done;
    if (checkStatus === true) {
        var newCheckStatus = false;
    } else {
        var newCheckStatus = true;
    }
    console.log(newCheckStatus);
    
}
