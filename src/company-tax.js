const electron = require('electron');
const path = require('path');
const replace = require('replace-in-file');

const filePath = process.env.PWD + '/email-templates/company-tax.txt';

//#region form data
clientFirstName = document.getElementById("clientFirstName");
clientLastName = document.getElementById("clientLastName");
companyName = document.getElementById("companyName");
companyEntityType = document.getElementById("companyEntityType");
financialYear = document.getElementById("financialYear");
amountPayable = document.getElementById("amountPayable");
amountRefundable = document.getElementById("amountRefundable");
additionalInfo = document.getElementById("additionalInfo");
btnSubmit = document.getElementById("btnSubmit");
//#endregion



btnSubmit.addEventListener("click", function () {
  const options = {
    files: filePath,
    from: [/{{clientFirstName}}/g, /{{clientLastName}}/g, /{{companyName}}/g, /{{companyEntityType}}/g, /{{financialYear}}/g, /{{amountPayable}}/g, /{{amountRefundable}}/g, /{{additionalInfo}}/g],
    to: [clientFirstName.value, clientLastName.value, companyName.value, companyEntityType.value, financialYear.value, amountPayable.value, amountRefundable.value, additionalInfo.value]
  };

  const results = replace(options);

});
