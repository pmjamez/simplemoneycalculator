import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Posts");
        
    }

    async getHtml(){
        return `

        <h1> Posts </h1>

        <p>Lorem Ispum Cillum</p>

        <p>
            <a href = "/posts" data-link>View Recent Posts</a>.
        </p>

        `;


    }
}