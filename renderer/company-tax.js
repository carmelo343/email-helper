const { ipcRenderer } = require('electron');
const $ = jQuery = require('jquery');
const app = require('./app');


$('#companyTaxForm').on('submit', e => {
  let formData = getFormData();
  ipcRenderer.send('create-company-tax-email', formData);
});

function getFormData() {
  let data = {
    clientFirstName: $('#clientFirstName').val(),
    clientLastName: $('#clientLastName').val(),
    companyName: $('#companyName').val(),
    companyEntityType: $('#companyEntityType').val(),
    financialYear: $('#financialYear').val(),
    taxAmount: $('#taxAmount').val(),
    taxType: $('input[name="taxType"]:checked').val(),
    payableDueDate: $('#payableDueDate').val(),
    additionalInfo: $('#additionalInfo').val().replace(/\r\n|\r|\n/g, "<br>")
  };

  if (data.taxType === 'refundable') {
    data.confirmBank = "(Please confirm bank details)";
    data.signPartB = " and Part B";
  }
  else if (data.taxType === 'payable') {
    data.payableDueDate = " DUE " + app.formatDate(data.payableDueDate);
  }

  return data;
}

function clearForm(formId) {
  document.getElementById(formId).reset();
  $('#payableDueDateDiv').hide();
}

