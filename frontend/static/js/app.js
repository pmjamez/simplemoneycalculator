
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

function AGI(taxInput){
    return taxInput * 0.67;

  }

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit-button").addEventListener("click", function () {
        const taxInput = parseFloat(document.getElementById("salary-input").value);
        const stateInput = parseFloat(document.getElementById("state-input").value);
        const statusInput = parseFloat(document.getElementById("status-input").value);
        const bonusInput = parseFloat(document.getElementById("bonus-input").value);
        const contributionInput = parseFloat(document.getElementById("contribution-input").value);

        // const singleStandardDeduction = 13850;
        // const headStandardDeduction = 20800;
        // const marriedStandardDeduction = 27700;

        // const dependentCredit = 2000;

        // let AGI;

        // if (statusInput === "Single" || statusInput === "MarriedSep"){
        //     AGI = taxInput - singleStandardDeduction;
        // } else if (stateInput === "Married"){
        //     AGI = taxInput - marriedStandardDeduction;
        // } else if (stateInput === "Head of Household"){
        //     AGI = taxInput - headStandardDeduction;
        // }else{
        //     console.error("Invalid filing status");
        //     return;
        // }
    
        let sum = AGI(taxInput);
        console.log(sum);
        document.getElementById("tax-result").value = sum;
       

    });
  });


  
