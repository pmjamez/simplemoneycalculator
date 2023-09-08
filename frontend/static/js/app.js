import Dashboard from "./views/Dashboard.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};


const router = async() => {
    //clientside development stuff
    const routes = [
        { path: "/", view: Dashboard},
        // { path: "/posts", view: () => console.log("Viewing Posts")},
        // { path: "/settings", view: () => console.log("Viewing Settings")},
    ];

    const potentialMatches = routes.map(route => {
        return{
            route: route,
            isMatch: location.pathname == route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    const view = new match.route.view();

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
console.log("JS is loaded!");
// function app(){
//     return(
//         <div className = "flex">

//         </div>
//     );
// }
// export default app;