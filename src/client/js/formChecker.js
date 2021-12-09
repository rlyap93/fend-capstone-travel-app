function checkForText(inputText) {
    console.log("::: Running checkForText :::", inputText);
    if(inputText != ""){
        return true;
    }
    else{
        return false;
    }
}

function checkForValidDate(inputDays,tripDuration) {
    console.log("::: Running checkForValidDate :::", inputDays);
    if(inputDays > 0 & (tripDuration > 1)){
        return true;
    }
    else{
        alert("Please enter valid dates")
        return false;
    }
}

export { checkForText, checkForValidDate }