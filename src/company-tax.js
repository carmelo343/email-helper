const electron = require('electron');
const path = require('path');
const replace = require('replace-in-file');

clientFirstName = document.getElementById("clientFirstName");
clientLastName = document.getElementById("clientLastName");
companyName = document.getElementById("companyName");
companyEntityType = document.getElementById("companyEntityType");
financialYear = document.getElementById("financialYear");
amountPayable = document.getElementById("amountPayable");
amountRefundable = document.getElementById("amountRefundable");
additionalInfo = document.getElementById("additionalInfo");
btnSubmit = document.getElementById("btnSubmit");

btnSubmit.addEventListener("click", function () {
  //alert(clientFirstName.value);

  var basePath = process.env.PWD
  var filePath = basePath + '/email-templates/company-tax.txt'

  const options = {
    files: filePath,
    from: /{{companyName}}/g,
    to: companyName.value,
  };

  const results = replace(options);

});



