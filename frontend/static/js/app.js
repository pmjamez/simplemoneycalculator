
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

    let taxbracket1 = 0;
    let taxbracket2 = 11000;
    let taxbracket3 = 42745;
    let taxbracket4 = 95375;
    let taxbracket5 = 182100;
    let taxbracket6 = 231250;
    let taxbracket7 = 578125;

    if (statusInput === 'Single' || statusInput === 'MarriedSep') {
        incomeAmounts = [taxbracket1,taxbracket2,taxbracket3,taxbracket4,taxbracket5,taxbracket6,taxbracket7];
    } else if (statusInput === 'Married') {
        incomeAmounts = [taxbracket1,taxbracket2*2,taxbracket3*2,taxbracket4*2,taxbracket5*2,taxbracket6*2,taxbracket7*2];
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
            amounts: null,
            deduction: [0],
            dependent: [0]
        },
        {
            name: "NH",
            brackets: [0.0],
            amounts: null,
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

    if (statusInput === "Single" || statusInput === "MarriedSep" || statusInput === "Head of Household"){
        AdjustedIncome = taxInput - deduction[0] - (dependentamount[0] * dependent) - contribution;
    } else if (statusInput === "Married"){
        AdjustedIncome = taxInput - deduction[1] - (dependentamount[0] * dependent) - contribution;
    }else{
        console.log("Invalid filing status");
    }

    if (!brackets || brackets.length === 0) {
        return 0;
    }


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

        let stateTax11 = CalculateStateTax(taxInput, statusInput, stateInput,contributionInput, dependentInput);
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
  
