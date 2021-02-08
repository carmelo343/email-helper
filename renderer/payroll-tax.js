const { ipcRenderer } = require('electron');
const { stat } = require('fs');
const $ = jQuery = require('jquery');
const app = require('./app');


let itemCount = 0;
let taxItems = [];
$('#addTaxItem').on('click', function (event) {
  event.preventDefault();
  itemCount++;

  let state = $('#state').val();
  let taxAmount = $('#taxAmount').val();
  let taxType = $('input[name="taxType"]:checked').val();
  let paymentType = $('input[name="paymentType"]:checked').val();

  if (!isTaxItemValid(state, taxAmount, taxType, paymentType)) {
    alert("Please fill out all fields");
    return;
  }

  taxItems.push({
    state: state,
    taxAmount: taxAmount,
    taxType: taxType,
    paymentType: paymentType
  });

  $('#taxItemTable').find('tbody')
    .append('<tr>'
      + `<td>${state}</td>`
      + `<td>${taxAmount}</td>`
      + `<td>${taxType}</td>`
      + `<td>${paymentType}</td>`
      + `<td><input type="button" id="deleteItemBtn${itemCount}" value="Delete" class="btn btn-danger"></button></td>`);

  $('[id^="deleteItemBtn"]').on('click', function (event) {
    event.preventDefault();
    let index = $(this).closest('tr').index();
    if (index < 1) {
      return;
    }
    $(this).closest('tr').remove();
    taxItems.splice(index - 1, 1);
  });

  resetTableInput();

});

$('#payrollTaxForm').on('submit', function () {
  let formData = app.getFormData($(this));
  let data = app.formatData(formData);
  data.taxItems = taxItems;
  debugger;

  ipcRenderer.send('create-payroll-email', data);
});

function resetTableInput() {
  $('#state').val('');
  $('#taxAmount').val('');
  $('input[name="taxType"]:checked').prop('checked', false);
  $('input[name="paymentType"]:checked').prop('checked', false);
}

function isTaxItemValid(...args) {
  let isValid = true;
  for (let i = 0; i < args.length; i++) {
    if(!args[i]) {
      isValid = false;
      break;
    }
  }

  return isValid;
  //debugger;
}