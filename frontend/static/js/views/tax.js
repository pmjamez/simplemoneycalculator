import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("tax");
        
    }

    async getHtml(){
        return `
        <body>

        <h1 class="page-title">QUICK CASH</h1>

    
          <nav class = "nav">
                <a href = "/tax" class = "nav__link" data-link > Tax Calculator </a>
                <a href = "/salary" class = "nav__link" data-link> Salary Calculator</a>
           </nav>
         </div>

         <div class = "pagebox">
             <div class="rounded-rectangle">
             <h2 class = "title">Calculate Tax</h2>
             <p class="description">Calculate your estimated tax payments based on your yearly salary</p>

                <div class="input-container">
                    <label for="tax-input" class="input-label">Enter Yearly Salary:</label>
                    <input type="number" id="tax-input" class="input-box" placeholder="Enter Yearly Salary">
                    <label for="tax-input" class="input-label">Additional:</label>
                    <input type="number" id="tax-input" class="input-box" placeholder="Enter Bonus (Optional)">
                    <button class="blue-button">Submit</button>
                </div>
           </div>

            <div class = "rounded-rectangle2">
             <h2 class = "title">Tax Estimation</h2>
             <p class="description">**Note this is only based on the standard deduction and no other contributions**</p>

                <div class="input-container">
                    <label for="tax-input" class="input-label">Tax Amount:</label>
                    <input type="text" id="tax-input" class="input-box" placeholder="Enter text...">
                    <label for="tax-input" class="input-label">Something:</label>
                    <input type="text" id="tax-input" class="input-box" placeholder="Enter text...">
                    <button class="blue-button">Submit</button>
                </div>

            </div>

        


         </div>
        

        
        
        </body>

        `;


    }
}