import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Settings");
        
    }

    async getHtml(){
        return `

        <h1> Settings </h1>

        <p>Lorem Ispum Cillum</p>

        <p>
            <a href = "/posts" data-link>View Recent Posts</a>.
        </p>

        `;


    }
}