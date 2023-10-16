function handleMoneyChoiceChange() {
 

    const typeSelect = document.getElementById("money-choice");

    const hourlyWageLabel = document.getElementById("Salaryorwage");
    const titleLabel = document.getElementById("page-title");
    const resultLabeltitle = document.getElementById("result-title");
    const firstDescription = document.getElementById("firstDescription");

 

    typeSelect.addEventListener("change", function () {
        const typeInput = typeSelect.options[typeSelect.selectedIndex].value;
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
    });
}

function resetForm(){
    document.getElementById("final-result").value = "";
    document.getElementById("Salaryorwage").value = "";
    document.getElementById("money-choice").selectedIndex = 0; // Reset the dropdown to its initial state
    document.getElementById("weeksyear").value = "";
    document.getElementById("hours").value = "";

}

function CalculateSomething(typeSelect, hourlyWageLabel){

    if (typeSelect === "Wage"){

    }else if(typeSelect === "Salary"){

    }else{
        
    }

    

}

function SubmitButton(){

}





document.addEventListener("DOMContentLoaded", function () {
    var resetButton = document.getElementById("reset-button2");
    
    if (resetButton) { // Check if the reset button element exists on the current page
        resetButton.addEventListener("click", resetForm);
    }

    const moneyChoiceDropdown = document.getElementById("money-choice");

    if (moneyChoiceDropdown) { // Check if the dropdown element exists on the current page
        moneyChoiceDropdown.addEventListener("change", handleMoneyChoiceChange);
    }
});
