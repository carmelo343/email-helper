const $ = jQuery = require('jquery');
const electron = require('electron');
const { shell } = require('electron');
const { get } = require('http');
const path = require('path');
//const replace = require('replace-in-file');
const { render, renderFile } = require('template-file');
const fs = require('fs');

const templatePath = process.cwd() + '/eml-templates/';
//const templatePath = process.cwd() + '/resources/app/eml-templates/';

let emlSkeleton = "Subject: {{subject}}\nX-Unsent: 1\nContent-Type: text/html\n\n{{body}}"

$(function () {

  $('#btnSubmit').on('click', function () {
    let formData = getFormData();
    let email = JSON.parse(fs.readFileSync(templatePath + 'company-tax.json'));

    email.subject = render(email.subject, formData);
    email.body = render(email.body, formData);

    let emlStr = render(emlSkeleton, email);
    fs.writeFileSync(templatePath + 'company-tax.eml', emlStr);
    shell.openPath(templatePath + 'company-tax.eml');

  });

});

function getFormData() {
  var data = {
    clientFirstName: $('#clientFirstName').val(),
    clientLastName: $('#clientLastName').val(),
    companyName: $('#companyName').val(),
    companyEntityType: $('#companyEntityType').val(),
    financialYear: $('#financialYear').val(),
    amountPayable: $('#amountPayable').val(),
    amountRefundable: $('#amountRefundable').val(),
    additionalInfo: $('#additionalInfo').val(),
  }
  return data;
}