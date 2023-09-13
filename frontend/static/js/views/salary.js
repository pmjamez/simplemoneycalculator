import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Salary");
        
    }

    async getHtml(){
        return `

        <body>

          <div class="rounded-rectangle">
            <h2 class = "title">Calculate Salary</h2>
            <p class="description">Calculate your estimated tax payments based on your salary</p>

            <div class="input-container">
                <label for="tax-input" class="input-label">Tax Amount:</label>
                <input type="text" id="tax-input" class="input-box" placeholder="Enter text...">

                <label for="tax-input" class="input-label">Something:</label>
                <input type="text" id="tax-input" class="input-box" placeholder="Enter text...">

                <button class="blue-button">Submit</button>
            </div>


            </div>
            
          <div class="second-rounded-rectangle">

              </div>
  
    
       

         </body>
      
    `
        
        
        


    }
}