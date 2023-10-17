
function handleMoneyChoiceChange() {

    const typeSelect1 = document.getElementById("money-choice");
    const hourlyWageLabel = document.querySelector('label[for="Salaryorwage"]');
    const titleLabel = document.getElementById("page-title");
    const resultLabeltitle = document.getElementById("result-title");
    const firstDescription = document.getElementById("firstDescription");
  


   updateLabels(typeSelect1, hourlyWageLabel, titleLabel, resultLabeltitle, firstDescription);

   typeSelect1.addEventListener("change", function() {
    updateLabels(typeSelect1, hourlyWageLabel, titleLabel, resultLabeltitle, firstDescription);
    });
}


function updateLabels(typeSelect1, hourlyWageLabel, titleLabel, resultLabeltitle, firstDescription) {
    
    const typeInput = typeSelect1.options[typeSelect1.selectedIndex].value;
    if (typeInput === "Wage") {
        hourlyWageLabel.textContent = "Input Hourly Wage";
        titleLabel.textContent = "Convert Wage";
        resultLabeltitle.textContent = "Converted Salary";
        firstDescription.textContent = "Convert your Wage to a Salary";
    } else if (typeInput === "Salary") {
        hourlyWageLabel.textContent = "Input Annual Salary";
        titleLabel.textContent = "Convert Salary";
        resultLabeltitle.textContent = "Converted Wage";
        firstDescription.textContent = "Convert your Salary to a Wage";
    } else {
        hourlyWageLabel.textContent = "Input Hourly Wage"; 
        titleLabel.textContent = "Convert Wage";
        resultLabeltitle.textContent = "Converted Salary";
        firstDescription.textContent = "Convert your Wage to a Salary";
    }
}





function resetForm(){
    document.getElementById("final-result").value = "";
    document.getElementById("Salaryorwage").value = "";
    document.getElementById("money-choice").selectedIndex = 0; // Reset the dropdown to its initial state
    document.getElementById("weeksyear").value = "";
    document.getElementById("hours").value = "";

}

function CalculateSomething(typeSelectValue, wage, hoursworked, weeksworked){
    
    

   

    let finalTotal = 0;
    let normalworkinghours = 40; 
 
    if (typeSelectValue === "Salary" && hoursworked <= normalworkinghours){
        finalTotal = wage/(hoursworked * weeksworked);
    }else if(typeSelectValue === "Salary" && hoursworked > normalworkinghours){
        finalTotal = (wage/weeksworked)/ (normalworkinghours + ((hoursworked - normalworkinghours) * 1.5));

    }else if(typeSelectValue === "Wage" && hoursworked <= normalworkinghours){
        finalTotal =  wage * hoursworked * weeksworked;
        
    }else if (typeSelectValue === "Wage" && hoursworked > normalworkinghours){
        finalTotal = (wage * normalworkinghours * weeksworked) + (wage * 1.5 * (hoursworked - normalworkinghours) * weeksworked);
    }else{
        console.log("error");
    }

    return finalTotal;

}
function formatResult(amount){
    return "$" + parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function SubmitButton(){
    const typeSelect = document.getElementById("money-choice");
    const typeSelectValue = typeSelect.options[typeSelect.selectedIndex].value;
    const wage = parseFloat(document.getElementById("Salaryorwage").value);
    const hoursworked = parseFloat(document.getElementById("hours").value);
    const weeksworked = parseFloat(document.getElementById("weeksyear").value);
    
    let displayResult = CalculateSomething(typeSelectValue, wage, hoursworked, weeksworked);

    if (typeSelectValue === "Wage"){
        document.getElementById("final-result").value = formatResult(displayResult) + " Per Year";
    }else{
        document.getElementById("final-result").value = formatResult(displayResult) + " Per Hour";
    }

    console.log("working");
   
}

document.addEventListener("DOMContentLoaded", function() {
    bindEventListenersForPage2();
});

function bindEventListenersForPage2() {
    var submitButton1 = document.getElementById("submit-button2");

    if (submitButton1) {
        
        submitButton1.removeEventListener("click", SubmitButton);
        submitButton1.addEventListener("click", SubmitButton);
    }

    var resetButton = document.getElementById("reset-button2");
    
    if (resetButton) {
        resetButton.removeEventListener("click", resetForm);
        resetButton.addEventListener("click", resetForm);
    }

    const moneyChoiceDropdown = document.getElementById("money-choice");

    if (moneyChoiceDropdown) {
        moneyChoiceDropdown.removeEventListener("change", handleMoneyChoiceChange);
        moneyChoiceDropdown.addEventListener("change", handleMoneyChoiceChange);
    }
}
