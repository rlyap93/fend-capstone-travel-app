function checkForText(inputText) {
    console.log("::: Running checkForText :::", inputText);
    if(inputText != ""){
        return true;
    }
    else{
        alert("Please enter a valid city")
        return false;
    }
}

function checkForValidDate(inputDays,startDate,endDate) {
    console.log("::: Running checkForValidDate :::", inputDays);
    if(inputDays > 0 & (endDate > startDate)){
        return true;
    }
    else{
        alert("Please enter valid dates")
        return false;
    }
}

export { checkForText, checkForValidDate }