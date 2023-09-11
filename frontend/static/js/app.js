import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Postview from "./views/Posts.js";
import Settings from "./views/Settings.js"

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
        { path: "/", view: Dashboard},
        { path: "/posts", view: Posts},
        { path: "/posts/:id", view: Postview},
        { path: "/settings", view: Settings}
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


function apple(){
    return(
        <div className = "text-center text-green-700 font-bold">
            Hi mom!
        </div>
    );
}
export default apple;