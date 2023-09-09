import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Viewing Post");
        
    }

    async getHtml(){
        console.log(this.params.id);
        return `

        <h1> Hello, Welcome! </h1>

        <p>Lorem Ispum Cillum</p>

        <p>
            <a href = "/posts" data-link>View Recent Posts</a>.
        </p>

        `;


    }
}