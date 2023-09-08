import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle("Dashboard");
        
    }

    async getHtml(){
        return `

        <h1> Hello, Welcome! </h1>

        <p>Lorem Ispum Cillum</p>

        <p>
            <a href = "/posts" data-link>View Recent Posts</a>.
        </p>

        `;


    }
}