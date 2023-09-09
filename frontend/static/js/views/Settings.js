import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Settings");
        
    }

    async getHtml(){
        return `

       

        `;


    }
}