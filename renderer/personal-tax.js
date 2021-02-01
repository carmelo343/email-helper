const { ipcRenderer } = require('electron');
const $ = jQuery = require('jquery');
const app = require('./app');


$("#personalTaxForm").on("submit", function () {
  let formData = app.getFormData($(this));
  let data = formatData(formData);
  ipcRenderer.send('create-personal-tax-email', data);
});


function formatData(data) {
  if (data.taxType === 'refundable') {
    data.confirmBank = "(Please confirm bank details)";
    data.signPartB = " and Part B";
  }
  else if (data.taxType === 'payable') {
    data.payableDueDate = " DUE " + app.formatDate(data.payableDueDate);
  }

  return data;
}