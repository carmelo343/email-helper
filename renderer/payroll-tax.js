const { ipcRenderer } = require('electron');
const $ = jQuery = require('jquery');
const app = require('./app');



$('#addTaxItem').on('click', function (event) {
  event.preventDefault();

  let state = $('#state').val();
  let taxAmount = $('#taxAmount').val();
  let taxType = $('input[name="taxType"]:checked').val();
  let paymentType = $('input[name="paymentType"]:checked').val();

  $('#taxItemTable').find('tbody')
    .append('<tr>'
      + `<td>${state}</td>`
      + `<td>${taxAmount}</td>`
      + `<td>${taxType}</td>`
      + `<td>${paymentType}</td>`
      + '<td><button id="deleteItemBtn" class="btn btn-danger" formnovalidate>Delete</button></td>');

});

$('#deleteItemBtn').on('click', function (event) {
  event.preventDefault();
  debugger;
});