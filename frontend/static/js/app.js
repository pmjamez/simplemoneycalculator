
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

function CalculateFederalTax(){
    return
}

function CalculateStateTax(sum, stateInput){
    return
}

function CalculateSocialSecurityTax(){
    return
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit-button").addEventListener("click", function () {
        const taxInput = parseFloat(document.getElementById("salary-input").value);
        const stateInput = parseFloat(document.getElementById("state-input").value);
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
    
        let sum = AGI(taxInput, statusInput, contributionInput, dependentInput);
        console.log(sum);
        console.log(statusInput);
        document.getElementById("tax-result").value = sum;
       

    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("reset-button").addEventListener("click", function () {
        // Clear all form fields
        document.getElementById("salary-input").value = "";
        document.getElementById("state-input").value = "";
        document.getElementById("status-input").selectedIndex = 0; // Reset the dropdown to its initial state
        document.getElementById("bonus-input").value = "";
        document.getElementById("contribution-input").value = "";
        document.getElementById("dependent-input").value = "";

        // Clear any previous error message
        document.getElementById("error-message").textContent = "";
    });
});
  
