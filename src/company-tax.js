const $ = jQuery = require('jquery');
const electron = require('electron');
const { shell } = require('electron');
const { get } = require('http');
const path = require('path');
const replace = require('replace-in-file');
var emlformat = require('eml-format');
const { render, renderFile } = require('template-file');
const fs = require('fs');
const emlTemplatePath = process.env.PWD + '/eml-templates/';

$(function () {

  $('#btnSubmit').on('click', function () {
    let formData = getFormData();
    let email = JSON.parse(fs.readFileSync(emlTemplatePath + 'company-tax.json'));
    let str = render(email.subject, formData);
    alert(str);
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