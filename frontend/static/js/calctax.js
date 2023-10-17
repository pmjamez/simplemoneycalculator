function AGI(taxInput, statusInput, contributionInput, dependentInput){
    const singleStandardDeduction = 13850;
    const headStandardDeduction = 20800;
    const marriedStandardDeduction = 27700;
    const dependentCredit = 2000;

    const contribution = isNaN(contributionInput) ? 0 : parseFloat(contributionInput);
    const dependent = isNaN(dependentInput) ? 0 : parseFloat(dependentInput) * dependentCredit;

    if (statusInput === "Single" || statusInput === "MarriedSep"){
            if (taxInput <= (singleStandardDeduction + contribution + dependent)){
                return 0;
            }else{
                return taxInput - singleStandardDeduction - contribution - dependent;
            }
        } else if (statusInput === "Married"){
            if (taxInput <= (singleStandardDeduction + contribution + dependent)){
                return 0;
            }else{
                return taxInput - marriedStandardDeduction - contribution - dependent;
            }
        } else if (statusInput === "HeadOfHousehold"){
            if (taxInput <= (singleStandardDeduction + contribution + dependent)){
                return 0;
            }else{
                return taxInput - headStandardDeduction - contribution - dependent;
            }
        }else{
            console.log("Invalid filing status");
        }
  }

function CalculateFederalTax(AdjustedIncome, statusInput){
    const taxRates = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
    const baseAmounts = {
        Single: [0, 11000, 42745, 95375, 182100, 231250, 578125],
        Married: [0, 22000, 85490, 190750, 364200, 462500, 1156250],
        MarriedSep: [0, 11000, 42745, 95375, 182100, 231250, 578125],
        HeadOfHousehold: [0, 15700, 59850, 95350, 182100, 2312250, 578100] 
    };

    

    const incomeAmounts = baseAmounts[statusInput];

    if (!incomeAmounts) {
        console.log("Error: Invalid status input");
        return;
    }

    let taxOwed = 0;
    for (let i = 1; i < incomeAmounts.length; i++) {
        const prevIncome = incomeAmounts[i - 1];
        const currentIncome = incomeAmounts[i];

        if (AdjustedIncome <= currentIncome) {
            taxOwed += (AdjustedIncome - prevIncome) * taxRates[i - 1];
            return taxOwed.toFixed(2); 
        } else {
            taxOwed += (currentIncome - prevIncome) * taxRates[i - 1];
        }
    }

    
    taxOwed += (AdjustedIncome - incomeAmounts[incomeAmounts.length - 1]) * taxRates[taxRates.length - 1];

    return taxOwed;


    
  
}

function CalculateStateTax(taxInput, statusInput, stateInput, contributionInput, dependentInput){

   

    const stateTaxRates = [
        {
            name: "AL",
            brackets: [0.02, 0.04, 0.05],
            amounts: [500, 2500, 3000],
            deduction: [3000, 8500],
            dependent: [1000]
        },
        {
            name: "AK",
            brackets: [0.0],
            amounts: null,
            deduction: [0],
            dependent: [0]
        },
        {
            name: "AZ",
            brackets: [0.025],
            amounts: [0],
            deduction: [13850, 27700],
            dependent: [100]
        },
        {
            name: "AR",
            brackets: [0.02, 0.04, 0.049],
            amounts: [0, 4300, 8500],
            deduction: [2270, 4540],
            dependent: [29]
        },
        {
            name: "CA",
            brackets: [0.01, 0.02, 0.04, 0.06, 0.08, 0.093, 0.103, 0.113, 0.123, 0.133],
            amounts: [0, 10099, 23942, 37788, 52454, 66295, 338639, 406364, 677275, 1000000],
            deduction: [5202, 10404],
            dependent: [433]
        },
        {
            name: "CO",
            brackets: [0.044],
            amounts: [0],
            deduction: [13850],
            dependent: [0]
        },
        {
            name: "CT",
            brackets: [0.03, 0.05, 0.055, 0.06, 0.065, 0.069, 0.0699],
            amounts: [0, 10000, 50000, 100000, 200000, 250000, 500000],
            deduction: [15000, 24000],
            dependent: [0]
        },
        {
            name: "DE",
            brackets: [0.022, 0.039, 0.048, 0.052, 0.0555, 0.066],
            amounts: [2000, 5000, 10000, 20000, 25000, 60000],
            deduction: [3250, 6500],
            dependent: [110]
        },
        {
            name: "FL",
            brackets: [0.0],
            amounts: [0],
            deduction: [0],
            dependent: [0]
        },
        {
            name: "GA",
            brackets: [0.01, 0.02, 0.03, 0.04, 0.05, 0.0575],
            amounts: [0, 750, 2250, 3750, 5250, 7000],
            deduction: [5400, 7100],
            dependent: [3000]
        },
        {
            name: "HI",
            brackets: [0.014,0.032,0.055,0.064,0.068,0.072,0.076,0.079,0.0825,0.09,0.1,0.11],
            amounts: [0,2400,4800,9600,14400,19200,24000,36000,48000,150000,175000,200000],
            deduction: [2200,4400],
            dependent: [1144]
        },
        {
            name: "ID",
            brackets: [0.058],
            amounts: [0],
            deduction: [13850,27700],
            dependent: [0]
        },
        {
            name: "IL",
            brackets: [0.0495],
            amounts: [0],
            deduction: [2425, 2850],
            dependent: [2425]
        },
        {
            name: "IN",
            brackets: [0.0315],
            amounts: [0],
            deduction: [1000,2000],
            dependent: [1000]
        },
        {
            name: "IA",
            brackets: [0.044, 0.0482,0.057,0.06],
            amounts: [0,6000,30000,75000],
            deduction: [40,80],
            dependent: [40]
        },
        {
            name: "KS",
            brackets: [0.031,0.0525,0.057],
            amounts: [0,15000,30000],
            deduction: [3500,8000],
            dependent: [2250]
        },
        {
            name: "KY",
            brackets: [0.045],
            amounts: [0],
            deduction: [2770,5540],
            dependent: []
        },
        {
            name: "LA",
            brackets: [0.0185,0.035,0.0425],
            amounts: [0,12500, 50000],
            deduction: [4500,9000],
            dependent: [1000]
        },
        {
            name: "ME",
            brackets: [0.058,0.0675,0.0715],
            amounts: [0,24500,5805],
            deduction: [13850,27700],
            dependent: [300]
        },
        {
            name: "MD",
            brackets: [0.02,0.03,0.04,0.0475,0.05,0.0525,0.055,0.0575],
            amounts: [1000, 2000, 3000, 100000,125000,150000,250000],
            deduction: [2400,4850],
            dependent: [3200]
        },
        {
            name: "MA",
            brackets: [0.05,0.09],
            amounts: [0,1000000],
            deduction: [4400,8800],
            dependent: [1000]
        },
        {
            name: "MI",
            brackets: [0.0425],
            amounts: [0.0],
            deduction: [5000,10000],
            dependent: [5000]
        },
        {
            name: "MN",
            brackets: [0.0535, 0.068,0.0785,0.0985],
            amounts: [0,30070,98760,183340],
            deduction: [13825,27650],
            dependent: [4800]
        },
        {
            name: "MS",
            brackets: [0.05],
            amounts: [10000],
            deduction: [6000,15000],
            dependent: [1500]
        },
        {
            name: "MO",
            brackets: [0.02,0.025,0.03,0.035,0.04,0.045,0.0495],
            amounts: [1121,2242,3363,4484,5605,6726,7847],
            deduction: [13850,27700],
            dependent: [0]
        },
        {
            name: "MT",
            brackets: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06,0.0675],
            amounts: [0,6300,9700,13000,16800,21600],
            deduction: [5540,11080],
            dependent: [2960]
        },
        {
            name: "NE",
            brackets: [0.0246,0.0351,0.0501,0.0664],
            amounts: [0,3700,22170,35730],
            deduction: [7900,15800],
            dependent: [157]
        },
        {
            name: "NV",
            brackets: [0.0],
            amounts: [0],
            deduction: [0],
            dependent: [0]
        },
        {
            name: "NH",
            brackets: [0.0],
            amounts: [0],
            deduction: [0],
            dependent: [0]
        },
        {
            name: "NJ",
            brackets: [0.014, 0.0175, 0.035,0.0552,0.0637,0.0897,0.107],
            amounts: [0,20000, 35000, 40000, 75000, 500000,1000000],
            deduction: [1000,2000],
            dependent: [1500]
        },
        {
            name: "NM",
            brackets: [0.017, 0.032, 0.047, 0.049, 0.059],
            amounts: [0, 5500, 11000, 16000, 210000],
            deduction: [13850,27700],
            dependent: [4000]
        },
        {
            name: "NY",
            brackets: [0.04, 0.045, 0.0525, 0.055,0.06,0.0685,0.00965,0.103,0.109],
            amounts: [8500, 11700, 13900, 80650, 215400, 1077550,5000000, 25000000],
            deduction: [8000,16500],
            dependent: [1000]
        },
        {
            name: "NC",
            brackets: [0.0475],
            amounts: null,
            deduction: [12750,25500],
            dependent: [0]
        },
        {
            name: "ND",
            brackets: [0.011, 0.0204, 0.0227, 0.0264, 0.029],
            amounts: [0,41775,101050,210825,458350],
            deduction: [13850,27700],
            dependent: [0]
        },
        {
            name: "OH",
            brackets: [0.0276,0.03222,0.0368,0.0399],
            amounts: [26050,46100,92150,115300],
            deduction: [2400,4800],
            dependent: [2400]
        },
        {
            name: "OK",
            brackets: [0.0025,0.0075,0.0175,0.0275,0.0375,0.0475],
            amounts: [0,1000,2500,3750,4900,7200],
            deduction: [6350,12700],
            dependent: [1000]
        },
        {
            name: "OR",
            brackets: [0.0475,0.0675,0.0875,0.099],
            amounts: [0,4050,10200,125000],
            deduction: [2605,5210],
            dependent: [236]
        },
        {
            name: "PA",
            brackets: [0.0307],
            amounts: [0],
            deduction: [0],
            dependent: [0]
        },
        {
            name: "RI",
            brackets: [0.0375,0.0475,0.0599],
            amounts: [0,68200,155000],
            deduction: [10000,20050],
            dependent: [4700]
        },
        {
            name: "SC",
            brackets: [0.03, 0.065],
            amounts: [3200,16040],
            deduction: [13850,27700],
            dependent: [4430]
        },
        {
            name: "SD",
            brackets: [0.0],
            amounts: null,
            deduction: [0],
            dependent: [0]
        },
        {
            name: "TN",
            brackets: [0.0],
            amounts: null,
            deduction: [0],
            dependent: [0]
        
        },
        {
            name: "TX",
            brackets: [0.0],
            amounts: null,
            deduction: [0],
            dependent: [0]
        
        },
        {
            name: "UT",
            brackets: [0.0485],
            amounts: null,
            deduction: [831,1662],
            dependent: [1802]
        },
        {
            name: "VT",
            brackets: [0.0335, 0.066, 0.076, 0.0875],
            amounts: [0, 42150,102200,213150],
            deduction: [6500,13050],
            dependent: [4500]
        },
        {
            name: "VA",
            brackets: [0.02, 0.03, 0.05, 0.0575],
            amounts: [0, 3000, 5000, 17000],
            deduction: [8000,16000],
            dependent: [930]
        },
        {
            name: "WA",
            brackets: [0.0],
            amounts: null,
            deduction: [0],
            dependent: [0]
        },
        {
            name: "WV",
            brackets: [0.03, 0.04, 0.045, 0.06, 0.065],
            amounts: [0, 10000, 25000, 40000, 60000],
            deduction: [0],
            dependent: [0]
        },
        {
            name: "WI",
            brackets: [0.0354, 0.0465, 0.053,0.0765],
            amounts: [0,13810,27630,304170],
            deduction: [12760,23620],
            dependent: [700]
        },
        {
            name: "WY",
            brackets: [0.0],
            amounts: null,
            deduction: [0],
            dependent: [0],

        },
        {
            name: "DC",
            brackets: [0.04,0.06,0.065,0.085,0.0925,0.0975,0.1075],
            amounts: [0,10000,40000,60000,250000,500000,1000000],
            deduction: [13850,27700],
            dependent: [0],

        }

       
    ]

    const contribution = isNaN(contributionInput) ? 0 : parseFloat(contributionInput);
    const dependent = isNaN(dependentInput) ? 0 : parseFloat(dependentInput);

    const stateInfo = stateTaxRates.find(state => state.name === stateInput);

    if (!stateInfo) {
        return "Invalid state input";
    }
    const brackets = stateInfo.brackets;
    const amounts = stateInfo.amounts;
    const deduction = stateInfo.deduction;
    const dependentamount = stateInfo.dependent;

    let AdjustedIncome = 0;

    if (statusInput === "Single" || statusInput === "MarriedSep" || statusInput === "HeadOfHousehold"){
        if (taxInput < (deduction[0] + (dependentamount[0] * dependent) + contribution)){
            AdjustedIncome = 0;
        }else{
            AdjustedIncome = taxInput - deduction[0] - (dependentamount[0] * dependent) - contribution;
        }
    } else if (statusInput === "Married"){
        if(deduction[0] === 0){
            AdjustedIncome = 0;
        }else{
            if (taxInput < (deduction[1] + (dependentamount[0] * dependent) + contribution)){
                AdjustedIncome = 0;
            }else{
                AdjustedIncome = taxInput - deduction[1] - (dependentamount[0] * dependent) - contribution;
            }
        }
       
    }else{
        console.log("Invalid filing status");
    }

 
    let stateTax = 0;
    let taxableIncome = AdjustedIncome;

    if (brackets === 0) {
        stateTax = 0;
    }else{
        for (let i = 0; i < brackets.length; i++) {
            if (i === brackets.length - 1) {
                // Apply the highest bracket rate to the remaining income
                stateTax += taxableIncome * brackets[i];
            } else {
                // Calculate tax within the current bracket
                const bracketAmount = amounts ? amounts[i] : 0;
                const taxableAmount = Math.min(taxableIncome, bracketAmount);
                stateTax += taxableAmount * brackets[i];
                taxableIncome -= taxableAmount;
            }
        }
    }
    return stateTax;
}

function CalculateSocialSecurityTax(taxInput, statusInput){

    const SocsecTax = 0.062;
    const incomecap = 160200;
    let factor = 0;

    if (statusInput === "Married"){
        factor = 2;
    }else{
        factor = 1;
    }

    let SStax = 0;

    if (taxInput < incomecap){
        SStax = taxInput * SocsecTax * factor;
    } else if (taxInput >= incomecap){
        SStax = incomecap * SocsecTax * factor;
    } else{
        console.log("error");
    }

    return SStax;
}

function CalculateMedicareTax(taxInput, statusInput){

    const MedcarTax = 0.0145;
    const addMedcarTax = 0.02345;

    let Medtax = 0;

    if (taxInput > 250000 && statusInput === "Married"){
        Medtax = taxInput * (MedcarTax +addMedcarTax) * 2 ;
    } else if (taxInput > 200000){
        Medtax = taxInput * (MedcarTax + addMedcarTax);
    } else if (statusInput === "Married"){
        Medtax = taxInput*MedcarTax * 2;
    }else{
        Medtax = taxInput*MedcarTax;
    }
    return Medtax;
}

function CalculateTotalAmount(displayFedTaxResult,displayMedTaxResult,displaySocialSecTaxResult,displayStateTaxResult){

    let total = (parseFloat(displayFedTaxResult) + parseFloat(displayMedTaxResult) + parseFloat(displaySocialSecTaxResult) + parseFloat(displayStateTaxResult));

    return total;

}

function CalculateTotalTakeHomePay(taxInput, displayTotalTaxAmount){

    let takehome = (parseFloat(taxInput) - parseFloat(displayTotalTaxAmount));
    return takehome;

}

function CalculateMonthlyTotalTakeHomePay(displayTakeHomePay){

    let takehome = (parseFloat(displayTakeHomePay)/12);
    return takehome;
    
}

function CalculatePercentage(taxInput, displayTotalTaxAmount ){
    let percentage = (displayTotalTaxAmount/taxInput) * 100;

    return percentage;
}

function formatCurrency(amount) {
    return "$" + parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function handleSubmitButtonClick() {
    const taxInput = parseFloat(document.getElementById("salary-input").value);

    const stateSelect = document.getElementById("state-input");
    const stateInput = stateSelect.options[stateSelect.selectedIndex].value;

    const statusSelect = document.getElementById("status-input");
    const statusInput = statusSelect.options[statusSelect.selectedIndex].value;

    const contributionInput = parseFloat(document.getElementById("contribution-input").value);
    const dependentInput = parseFloat(document.getElementById("dependent-input").value);

    if (statusInput === "" || stateInput === "") {
        document.getElementById("error-message").textContent = "Please fill out first 3 fields.";
        return; 
    }

    document.getElementById("error-message").textContent = "";

    let AdjustedIncome = AGI(taxInput, statusInput, contributionInput, dependentInput);

    let displayFedTaxResult = CalculateFederalTax(AdjustedIncome, statusInput);
    document.getElementById("fed-tax-result").value = formatCurrency(displayFedTaxResult);

    let displayStateTaxResult = CalculateStateTax(taxInput, statusInput, stateInput,contributionInput, dependentInput);
    document.getElementById("state-tax-result").value = formatCurrency(displayStateTaxResult);

    let displaySocialSecTaxResult = CalculateSocialSecurityTax(taxInput, statusInput);
    document.getElementById("social-tax-result").value = formatCurrency(displaySocialSecTaxResult);

    let displayMedTaxResult = CalculateMedicareTax(taxInput, statusInput);
    document.getElementById("medi-tax-result").value = formatCurrency(displayMedTaxResult);

    let displayTotalTaxAmount = CalculateTotalAmount(displayFedTaxResult,displayMedTaxResult,displaySocialSecTaxResult,displayStateTaxResult);
    document.getElementById("tax-result").value = formatCurrency(displayTotalTaxAmount);

    let displayTakeHomePay = CalculateTotalTakeHomePay(taxInput, displayTotalTaxAmount);
    document.getElementById("takehome-pay").value = formatCurrency(displayTakeHomePay);

    let monthdisplayTakeHomePay = CalculateMonthlyTotalTakeHomePay(displayTakeHomePay);
    document.getElementById("monthtakehome-pay").value =formatCurrency(monthdisplayTakeHomePay);

    let displayPercentage = CalculatePercentage(taxInput, displayTotalTaxAmount);
    document.getElementById("percentage").value =  displayPercentage.toFixed(2) + "%";
}

function resetForm() {
    document.getElementById("salary-input").value = "";
    document.getElementById("state-input").value = "";
    document.getElementById("status-input").selectedIndex = 0; // Reset the dropdown to its initial state
    document.getElementById("contribution-input").value = "";
    document.getElementById("dependent-input").value = "";
    document.getElementById("error-message").textContent = "";
    document.getElementById("tax-result").value ="";
    document.getElementById("fed-tax-result").value ="";
    document.getElementById("state-tax-result").value ="";
    document.getElementById("social-tax-result").value ="";
    document.getElementById("medi-tax-result").value ="";
    document.getElementById("takehome-pay").value ="";
    document.getElementById("monthtakehome-pay").value ="";
    document.getElementById("percentage").value ="";
}

document.addEventListener("DOMContentLoaded", function() {
    bindEventListeners();
});

function bindEventListeners() {
    var resetButton = document.getElementById("reset-button");
    
    if (resetButton) {
        // Remove any previously bound event listener
        resetButton.removeEventListener("click", resetForm);
        resetButton.addEventListener("click", resetForm);
    }

    const submitButton = document.getElementById("submit-button");
    
    if (submitButton) {
        // Remove any previously bound event listener
        submitButton.removeEventListener("click", handleSubmitButtonClick);
        submitButton.addEventListener("click", handleSubmitButtonClick);
    }
}