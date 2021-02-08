const { ipcRenderer } = require('electron');
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

});


