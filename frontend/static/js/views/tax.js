import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("tax");
        
    }

    async getHtml(){
        return `
        <body>
         </div>  

    
          <nav class = "nav">
                <a href = "/tax" class = "nav__link" data-link > <b> Tax Calculator</b> </a>
                <a href = "/salary" class = "nav__link" data-link> <b>Wage Converter<b></a>

           </nav>
         </div>

         <div class = "pagebox">
             <div class="rounded-rectangle">
             <h2 class = "title">Calculate Tax</h2>
             <p class="description">Calculate your estimated tax payments based on your yearly salary</p>

                <div class="input-container">
                    <label for="salary-input" class="input-label">Salary:</label>
                    <input type="number" id="salary-input" class="input-box" placeholder="Enter Yearly Salary">
                    <label for="state-input" class="input-label">State:</label>
                    <select id="state-input" class="input-box" placeholder="Select State">
                        <option value="">Select a state</option>
                        <option value="AL">Alabama (AL)</option>
                        <option value="AK">Alaska (AK)</option>
                        <option value="AZ">Arizona (AZ)</option>
                        <option value="AR">Arkansas (AR)</option>
                        <option value="CA">California (CA)</option>
                        <option value="CO">Colorado (CO)</option>
                        <option value="CT">Connecticut (CT)</option>
                        <option value="DE">Delaware (DE)</option>
                        <option value="FL">Florida (FL)</option>
                        <option value="GA">Georgia (GA)</option>
                        <option value="HI">Hawaii (HI)</option>
                        <option value="ID">Idaho (ID)</option>
                        <option value="IL">Illinois (IL)</option>
                        <option value="IN">Indiana (IN)</option>
                        <option value="IA">Iowa (IA)</option>
                        <option value="KS">Kansas (KS)</option>
                        <option value="KY">Kentucky (KY)</option>
                        <option value="LA">Louisiana (LA)</option>
                        <option value="ME">Maine (ME)</option>
                        <option value="MD">Maryland (MD)</option>
                        <option value="MA">Massachusetts (MA)</option>
                        <option value="MI">Michigan (MI)</option>
                        <option value="MN">Minnesota (MN)</option>
                        <option value="MS">Mississippi (MS)</option>
                        <option value="MO">Missouri (MO)</option>
                        <option value="MT">Montana (MT)</option>
                        <option value="NE">Nebraska (NE)</option>
                        <option value="NV">Nevada (NV)</option>
                        <option value="NH">New Hampshire (NH)</option>
                        <option value="NJ">New Jersey (NJ)</option>
                        <option value="NM">New Mexico (NM)</option>
                        <option value="NY">New York (NY)</option>
                        <option value="NC">North Carolina (NC)</option>
                        <option value="ND">North Dakota (ND)</option>
                        <option value="OH">Ohio (OH)</option>
                        <option value="OK">Oklahoma (OK)</option>
                        <option value="OR">Oregon (OR)</option>
                        <option value="PA">Pennsylvania (PA)</option>
                        <option value="RI">Rhode Island (RI)</option>
                        <option value="SC">South Carolina (SC)</option>
                        <option value="SD">South Dakota (SD)</option>
                        <option value="TN">Tennessee (TN)</option>
                        <option value="TX">Texas (TX)</option>
                        <option value="UT">Utah (UT)</option>
                        <option value="VT">Vermont (VT)</option>
                        <option value="VA">Virginia (VA)</option>
                        <option value="WA">Washington (WA)</option>
                        <option value="WV">West Virginia (WV)</option>
                        <option value="WI">Wisconsin (WI)</option>
                        <option value="WY">Wyoming (WY)</option>
                     </select>
                    <label for="status-input" class="input-label">Status:</label>
                    <select id="status-input" class="input-box" placeholder="Select Status">
                            <option value="">Select Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married, Filed Jointly</option>
                            <option value="MarriedSep">Married, Filed Separately</option>
                            <option value="Head of Household"> Head of Household</option>
                     </select>
                    <label for="bonus-input" class="input-label">Additional (Optional):</label>
                    <input type="number" id="bonus-input" class="input-box" placeholder="Enter Bonus">
                    <input type="number" id="contribution-input" class="input-box" placeholder="Contributions (401K*, HSA**, 457b***)">
                    <label for="dependent-input" class="input-label"></label>
                    <input type = "number" id="dependent-input" class="input-box" placeholder="# of Dependents" step = "any">
                    <div class="button-container">
                     <button id="submit-button" class="blue-button">Submit</button>
                     <button id="reset-button" class="reset-button">Reset</button>
                    </div>
                    <div id="error-message" style="color: red;"></div>

                    
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

        `;


    }

};
 