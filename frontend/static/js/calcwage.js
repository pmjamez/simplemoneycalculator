function handleMoneyChoiceChange() {
    console.log("working");

    const typeSelect = document.getElementById("money-choice");
    

    
    const hourlyWageLabel = document.querySelector('label[for="Salaryorwage"]');

    typeSelect.addEventListener("change", function () {
        const typeInput = typeSelect.options[typeSelect.selectedIndex].value;
        if (typeInput === "Wage") {
            hourlyWageLabel.textContent = "Input Hourly Wage";
        } else if (typeInput === "Salary") {
            hourlyWageLabel.textContent = "Input Annual Salary";
        } else {
            hourlyWageLabel.textContent = "Input Hourly Wage"; // Default label
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {



const moneyChoiceDropdown = document.getElementById("money-choice");

if (moneyChoiceDropdown) { // Check if the dropdown element exists on the current page
    moneyChoiceDropdown.addEventListener("change", handleMoneyChoiceChange);
}
});
