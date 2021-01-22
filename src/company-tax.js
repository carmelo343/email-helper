const electron = require('electron');
const {shell} = require('electron');
const path = require('path');
const replace = require('replace-in-file');



const emlTemplatePath = process.env.PWD + '/eml-templates/';

//#region form data
clientFirstName = document.getElementById('clientFirstName');
clientLastName = document.getElementById('clientLastName');
companyName = document.getElementById('companyName');
companyEntityType = document.getElementById('companyEntityType');
financialYear = document.getElementById('financialYear');
amountPayable = document.getElementById('amountPayable');
amountRefundable = document.getElementById('amountRefundable');
additionalInfo = document.getElementById('additionalInfo');
btnSubmit = document.getElementById('btnSubmit');
//#endregion


btnSubmit.addEventListener("click", async function () {
  fs = require('fs');
  fs.copyFile(emlTemplatePath + 'company-tax.eml', emlTemplatePath + 'company-tax-generated.eml', (err) => {
    if (err) throw err;
  });

  const options = {
    files: emlTemplatePath + 'company-tax-generated.eml',
    from: [/{{clientFirstName}}/g, /{{clientLastName}}/g, /{{companyName}}/g, /{{companyEntityType}}/g, /{{financialYear}}/g, /{{amountPayable}}/g, /{{amountRefundable}}/g, /{{additionalInfo}}/g],
    to: [clientFirstName.value, clientLastName.value, companyName.value, companyEntityType.value, financialYear.value, amountPayable.value, amountRefundable.value, additionalInfo.value]
  };
  const results = await replace(options);
  
  
  shell.openPath(emlTemplatePath + 'company-tax-generated.eml');

  var dddd = 0;

});



