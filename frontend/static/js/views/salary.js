import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Salary");
        
    }

    async getHtml(){
        return `

        <body>
    
          <nav class = "nav">
                <a href = "/tax" class = "nav__link" data-link > <b> Tax Calculator</b> </a>
                <a href = "/salary" class = "nav__link" data-link> <b>Wage Converter<b></a>
           </nav>
         </div>

         <div class = "pagebox">
             <div class="rounded-rectangle">
             <h2 class = "title">Convert Wage</h2>
             <p class="description">Calculate your estimated tax payments based on your yearly salary</p>

                <div class="input-container">

                    <label for "money-choice" class = "input-label">Salary Or Wage</label/>
                    <select id = "money-choice" class ="input-box" placeholder = "Select Type">
                        <option value = "">Select Type</option>
                        <option value = "Wage">Wage</option>
                        <option value = "Salary">Salary</option>
                        </select>
                    
                    <label for "Salaryorwage" class = "input-label">Input Salary or Wage</label/>
                    <input type = "number" id="Salaryorwage" class="input-box" placeholder="" step = "any">
                    <label for "hours" class = "input-label">Hours worked per week?</label/>
                    <input type = "number" id="hours" class="input-box" placeholder="" step = "any">
                    <label for "weeksyear" class = "input-label">How many weeks worked per year?</label/>
                    <input type = "number" id="weeksyear" class="input-box" placeholder="" step = "any">

                    <div class="button-container">
                    <button id="submit-button" class="blue-button">Submit</button>
                    <button id="reset-button" class="reset-button">Reset</button>
                   </div>
                </div>
           </div>

            <div class = "rounded-rectangle2">
             <h2 class = "title">Tax Estimation</h2>
             <p class="description">**Note this is only based on the standard deduction and no other contributions**</p>

                <div class="input-container">
                    <label for="tax-result" class="input-label">Total Yearly Tax Amount:</label>
                    <input type="text" id="tax-result" class="input-box" placeholder=""disabled>
                    <label for="fed-tax-result" class="input-label">Federal Tax:</label>
                    <input type="text" id="fed-tax-result" class="input-box" placeholder=""disabled>
                    <label for="state-tax-result" class="input-label">State Tax:</label>
                    <input type="text" id="state-tax-result" class="input-box" placeholder=""disabled>
                    <label for="social-tax-result" class="input-label">Social Security Tax:</label>
                    <input type="text" id="social-tax-result" class="input-box" placeholder=""disabled>
                    <label for="medi-tax-result" class="input-label">Medicare Tax:</label>
                    <input type="text" id="medi-tax-result" class="input-box" placeholder=""disabled>
                    <label for="takehome-pay" class="input-label">Yearly Take-Home Pay:</label>
                    <input type="text" id="takehome-pay" class="input-box" placeholder=""disabled>
                    <label for="monthtakehome-pay" class="input-label">Monthly Take-Home Pay:</label>
                    <input type="text" id="monthtakehome-pay" class="input-box" placeholder=""disabled>
               
                </div>

            </div>

        


         </div>

         <script src="app.js"></script>
        

        
        </body>

        
      
    `
        
        
        


    }
}