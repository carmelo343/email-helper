const $ = jQuery = require('jquery');
const electron = require('electron');
const { shell } = require('electron');
const { get } = require('http');
const path = require('path');
//const replace = require('replace-in-file');
const { render, renderFile } = require('template-file');
const fs = require('fs');
const { clear } = require('console');

const templatePath = process.cwd() + '/eml-templates/';
//const templatePath = process.cwd() + '/resources/app/eml-templates/';

let emlSkeleton = "Subject: {{subject}}\nX-Unsent: 1\nContent-Type: text/html\n\n{{body}}"

$(function () {

  initFinancialYearSelect();

  $('input[name=taxType]').on("change", function () {
    if ($(this).val() === 'payable') {
      $('#payableDueDateDiv').show();
      $('#payableDueDate').prop('required', true);
    }
    else {
      $('#payableDueDateDiv').hide();
      $('#payableDueDate').prop('required', false);
    }
  });

  $("input[data-type='currency']").on({
    keyup: function () {
      formatCurrency($(this));
    },
    blur: function () {
      formatCurrency($(this), "blur");
    }
  });

  $('#companyTaxForm').on('submit', function () {
    let formData = getFormData();
    let email = JSON.parse(fs.readFileSync(templatePath + 'company-tax.json'));

    email.subject = render(email.subject, formData);
    email.body = render(email.body, formData);

    let emlStr = render(emlSkeleton, email);
    fs.writeFileSync(templatePath + 'company-tax.eml', emlStr);
    shell.openPath(templatePath + 'company-tax.eml');

    clearForm('companyTaxForm');
  });

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
  }




  if (data.taxType === 'refundable') {
    data.confirmBank = "(Please confirm bank details)";
    data.signPartB = " and Part B";
  }
  else if (data.taxType === 'payable') {
    data.payableDueDate = " DUE " + formatDate(data.payableDueDate);
  }

  return data;
}

function initFinancialYearSelect() {
  let current = new Date().getFullYear();
  let min = current - 5;
  let max = current + 5;
  let select = $('#financialYear');

  for (let i = min; i <= max; i++) {
    $('#financialYear').append($('<option>', {
      value: i,
      text: i
    }));
  }
}

function clearForm(formId) {
  document.getElementById(formId).reset();
  $('#payableDueDateDiv').hide();
}

function formatDate(date) {
  let formattedDate = new Date(date);
  let options = { day: 'numeric', month: 'short', year: 'numeric' };

  formattedDate = formattedDate.toLocaleDateString("en-US", options).replace(',', '');
  let dateArray = formattedDate.split(' ');
  formattedDate = `${dateArray[1]}-${dateArray[0]}-${dateArray[2]}`

  return formattedDate;
}


function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.

  // get input value
  var input_val = input.val();

  // don't validate empty input
  if (input_val === "") { return; }

  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");

  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);

    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;

    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }

  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}


