import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Salary");
        
    }

    async getHtml(){
        return `

        <body>

        <h1 class="page-title">QUICK CASH</h1>

    
          <nav class = "nav">
                <a href = "/tax" class = "nav__link" data-link > Tax Calculator </a>
                <a href = "/salary" class = "nav__link" data-link> Wage Converter</a>
           </nav>
         </div>

         <div class = "pagebox">
             <div class="rounded-rectangle">
             <h2 class = "title">Convert Wage</h2>
             <p class="description">Calculate your estimated tax payments based on your yearly salary</p>

                <div class="input-container">
                    <label for="salary-input" class="input-label">Salary:</label>
                    <input type="number" id="salary-input" class="input-box" placeholder="Enter Yearly Salary">
                   
                    <label for="status-input" class="input-label">Status:</label>
                    <select id="status-input" class="input-box" placeholder="Select Status">
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married, Filing Jointly">Married</option>
                        <option value="Married, Filing Separately">Divorced</option>
                        <option value="Head of Household">Head of Household</option>
                     </select>
                    <label for="bonus-input" class="input-label">Additional (Optional):</label>
                    <input type="number" id="bonus-input" class="input-box" placeholder="Enter Bonus">
                    <input type="number" id="contribution-input" class="input-box" placeholder="Contributions (401K*, HSA**, 457b***)">
                    <label for="dependent-input" class="input-label"></label>
                    <input type = "number" id="dependent-input" class="input-box" placeholder="# of Dependents" step = "any">
                    <button id = "submit-button" class="blue-button">Submit</button>
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