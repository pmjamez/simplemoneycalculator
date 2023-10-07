
import salary from "./views/salary.js";
import tax from "./views/tax.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key,values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async() => {

    console.log(pathToRegex('/posts/:id'));
    //clientside development stuff
    const routes = [
        { path: "/salary", view: salary},
        { path: "/tax", view: tax}
    ];

    const potentialMatches = routes.map(route => {
        return{
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        }
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

//References history when clicking on new links, redirects default behavior, more efficient
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});

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
        } else if (statusInput === "Head of Household"){
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

    let incomeAmounts = [];

    if (statusInput === 'Single' || statusInput === 'MarriedSep') {
        incomeAmounts = [0, 11000, 44725, 95375, 182100, 231250, 578125];
    } else if (statusInput === 'Married') {
        incomeAmounts = [0, 22000, 89450, 190750, 364200, 462500, 693750];
    } else if (statusInput === "Head of Household") {
        incomeAmounts = [0, 15700, 59850, 95350, 182100, 2312250, 578100];
    } else {
        console.log ("error");
    }
    let taxOwed = 0;
    
    for (let i = 1; i < incomeAmounts.length; i++) {
        const prevIncome = incomeAmounts[i - 1];
        const currentIncome = incomeAmounts[i];

        if (AdjustedIncome <= currentIncome) {
            taxOwed += (AdjustedIncome - prevIncome) * taxRates[i - 1];
            break; 
        } else {
            taxOwed += (currentIncome - prevIncome) * taxRates[i - 1];
        }
    }
    return taxOwed;
}

function CalculateStateTax(AdjustedIncome, stateInput){

    const stateTaxRates = [
        {
            name: "AL",
            brackets: [0.02, 0.04, 0.05],
            amounts: [0, 500, 3000],
        },
        {
            name: "AK",
            brackets: [0.0],
            amounts: null,
        },
        {
            name: "AZ",
            brackets: [0.0259, 0.0334, 0.0417, 0.0450, 0.0490, 0.0590, 0.0800],
            amounts: [10318, 25872, 51744, 155232, 517440, 1552320],
        },
        {
            name: "AR",
            brackets: [0.02, 0.04, 0.05, 0.0590, 0.0660],
            amounts: [4299, 8499, 12699, 21165],
        },
        {
            name: "CA",
            brackets: [0.01, 0.02, 0.04, 0.06, 0.08, 0.093, 0.103, 0.113, 0.123],
            amounts: [8542, 20255, 31969, 44377, 56085, 286492, 343791],
        },
        {
            name: "CO",
            brackets: [0.0450],
            amounts: null,
        },
        {
            name: "CT",
            brackets: [0.03, 0.05, 0.055, 0.06, 0.065, 0.069],
            amounts: [10000, 50000, 100000, 200000],
        },
        {
            name: "DE",
            brackets: [0.022, 0.039, 0.048, 0.052, 0.0555, 0.0595, 0.066, 0.0705, 0.078],
            amounts: [2000, 5000, 10000, 20000, 25000, 60000],
        },
        {
            name: "FL",
            brackets: [0.04, 0.055, 0.06, 0.065, 0.07, 0.075],
            amounts: [5000, 25000, 50000, 75000, 100000],
        },
        {
            name: "GA",
            brackets: [0.01, 0.02, 0.03, 0.04, 0.05, 0.0575, 0.06],
            amounts: [750, 2250, 3750, 5250, 7000],
        },
        {
            name: "HI",
            brackets: [0.014, 0.032, 0.055, 0.064, 0.068, 0.072, 0.076, 0.079, 0.0825],
            amounts: [2400, 4800, 9600, 14400, 19200],
        },
        {
            name: "ID",
            brackets: [0.01125, 0.03125, 0.0325, 0.035, 0.04, 0.05, 0.06, 0.06925],
            amounts: [1550, 3100, 4650, 6200, 7750],
        },
        {
            name: "IL",
            brackets: [0.0495],
            amounts: null,
        },
        {
            name: "IN",
            brackets: [0.0323, 0.0333, 0.034, 0.0323],
            amounts: [10000, 25000, 50000],
        },
        {
            name: "IA",
            brackets: [0.0033, 0.0067, 0.0225, 0.0414, 0.0563, 0.0667],
            amounts: [1000, 5000, 10000, 20000],
        },
        {
            name: "KS",
            brackets: [0.031, 0.0525],
            amounts: [15000, 30000],
        },
        {
            name: "KY",
            brackets: [0.02, 0.03, 0.04, 0.05, 0.058, 0.06],
            amounts: [3000, 4000, 5000, 5800, 6000],
        },
        {
            name: "LA",
            brackets: [0.02, 0.04, 0.06],
            amounts: [12500, 50000],
        },
        {
            name: "ME",
            brackets: [0.058, 0.0675],
            amounts: [21050],
        },
        {
            name: "MD",
            brackets: [0.02, 0.03, 0.04, 0.0475, 0.05, 0.0525, 0.055, 0.0575, 0.06],
            amounts: [1000, 2000, 3000, 4000, 5000],
        },
        {
            name: "MA",
            brackets: [0.05],
            amounts: null,
        },
        {
            name: "MI",
            brackets: [0.0425],
            amounts: null,
        },
        {
            name: "MN",
            brackets: [0.0535, 0.0705, 0.0785, 0.0985],
            amounts: [27090, 180251, 280251],
        },
        {
            name: "MS",
            brackets: [0.03, 0.04, 0.05],
            amounts: [5000, 10000],
        },
        {
            name: "MO",
            brackets: [0.015, 0.02, 0.025, 0.03, 0.035, 0.04, 0.054],
            amounts: [1008, 2108, 4216, 8429, 10000],
        },
        {
            name: "MT",
            brackets: [0.01, 0.02, 0.03, 0.04, 0.054, 0.069],
            amounts: [2900, 5800, 8700, 11599],
        },
        {
            name: "NE",
            brackets: [0.0246, 0.0322, 0.0357, 0.0501, 0.0684],
            amounts: [3200, 16400, 29750, 31900],
        },
        {
            name: "NV",
            brackets: [0.0],
            amounts: null,
        },
        {
            name: "NH",
            brackets: [0.0],
            amounts: null,
        },
        {
            name: "NJ",
            brackets: [0.014, 0.0175, 0.0245, 0.035, 0.0553, 0.0637, 0.0897],
            amounts: [20000, 35000, 40000, 75000, 500000],
        },
        {
            name: "NM",
            brackets: [0.017, 0.032, 0.047, 0.049, 0.059],
            amounts: [5500, 11000, 16000],
        },
        {
            name: "NY",
            brackets: [0.04, 0.045, 0.0525, 0.059, 0.0633, 0.0657, 0.0685, 0.0882, 0.0965],
            amounts: [8500, 11700, 13900, 21400, 80650, 215400, 1077550],
        },
        {
            name: "NC",
            brackets: [0.0525],
            amounts: null,
        },
        {
            name: "ND",
            brackets: [0.011, 0.0204, 0.0227, 0.0264, 0.029],
            amounts: [3950, 9775, 39475],
        },
        {
            name: "OH",
            brackets: [0.005, 0.01, 0.02, 0.025, 0.03, 0.035, 0.045],
            amounts: [10750, 21500, 43000],
        },
        {
            name: "OK",
            brackets: [0.005, 0.01, 0.02, 0.03, 0.04, 0.05, 0.0525, 0.055, 0.0565],
            amounts: [1000, 5000, 10000, 20000, 25000, 50000],
        },
        {
            name: "OR",
            brackets: [0.05, 0.07, 0.09, 0.099, 0.108, 0.11, 0.1125],
            amounts: [3400, 15000, 20000, 125000],
        },
        {
            name: "PA",
            brackets: [0.0307],
            amounts: null,
        },
        {
            name: "RI",
            brackets: [0.0375, 0.0475, 0.0599, 0.059],
            amounts: [6150, 15750, 67450],
        },
        {
            name: "SC",
            brackets: [0.03, 0.04, 0.05, 0.06, 0.07],
            amounts: [3000, 6000, 12000, 17000],
        },
        {
            name: "SD",
            brackets: [0.0],
            amounts: null,
        },
        {
            name: "TN",
            brackets: [0.01, 0.02, 0.03, 0.04, 0.045, 0.05, 0.06],
            amounts: [10000, 20000, 30000, 45000],
        },
        {
            name: "TX",
            brackets: [0.0, 0.005, 0.01, 0.015, 0.02, 0.025, 0.03],
            amounts: [5000, 10000, 15000, 20000],
        },
        {
            name: "UT",
            brackets: [0.0495],
            amounts: null,
        },
        {
            name: "VT",
            brackets: [0.0335, 0.066, 0.076, 0.0875, 0.0895],
            amounts: [39150, 195750, 260250],
        },
        {
            name: "VA",
            brackets: [0.02, 0.03, 0.0575],
            amounts: [3000, 5000, 17000],
        },
        {
            name: "WA",
            brackets: [0.0],
            amounts: null,
        },
        {
            name: "WV",
            brackets: [0.03, 0.04, 0.045, 0.06],
            amounts: [10000, 25000, 40000],
        },
        {
            name: "WI",
            brackets: [0.0354, 0.0465, 0.062]
        },
        {
            name: "WY",
            brackets: [0.0],
            amounts: null,
        }
    ]
    console.log(stateInput);

    const stateInfo = stateTaxRates.find(state => state.name === stateInput);

    if (!stateInfo) {
        return "Invalid state input";
    }

    const brackets = stateInfo.brackets;
    const amounts = stateInfo.amounts;

    // Check if the state has no tax (e.g., Alaska, Florida, etc.)
    if (!brackets || brackets.length === 0) {
        return 0;
    }

    // Calculate the state tax owed based on the income and tax brackets
    let stateTax = 0;
    let taxableIncome = AdjustedIncome;

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

    return stateTax;
}

function CalculateSocialSecurityTax(){
    return
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit-button").addEventListener("click", function () {
        const taxInput = parseFloat(document.getElementById("salary-input").value);

        const stateSelect = document.getElementById("state-input");
        const stateInput = stateSelect.options[stateSelect.selectedIndex].value;

        const statusSelect = document.getElementById("status-input");
        const statusInput = statusSelect.options[statusSelect.selectedIndex].value;
        const bonusInput = parseFloat(document.getElementById("bonus-input").value);
        const contributionInput = parseFloat(document.getElementById("contribution-input").value);
        const dependentInput = parseFloat(document.getElementById("dependent-input").value);

        if (statusInput === "" || stateInput === "") {
            document.getElementById("error-message").textContent = "Please fill out first 3 fields.";
            return; 
        }

        // Clear any previous error message
        document.getElementById("error-message").textContent = "";
    
        let AdjustedIncome = AGI(taxInput, statusInput, contributionInput, dependentInput);

        console.log(AdjustedIncome);
        let sum = CalculateFederalTax(AdjustedIncome, statusInput);
        console.log(sum);
        console.log(statusInput);
        document.getElementById("fed-tax-result").value = sum;

        let stateTax11 = CalculateStateTax(AdjustedIncome, stateInput);
        console.log(stateTax11);
        document.getElementById("state-tax-result").value = stateTax11;
       

    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("reset-button").addEventListener("click", function () {
        
        document.getElementById("salary-input").value = "";
        document.getElementById("state-input").value = "";
        document.getElementById("status-input").selectedIndex = 0; // Reset the dropdown to its initial state
        document.getElementById("bonus-input").value = "";
        document.getElementById("contribution-input").value = "";
        document.getElementById("dependent-input").value = "";
       
        document.getElementById("error-message").textContent = "";
    });
});
  
