const { ipcRenderer } = require('electron');
const $ = jQuery = require('jquery');
const app = require('./app');


$("#iasTaxForm").on("submit", function () {
  debugger;
  let formData = app.getFormData($(this));
  let data = app.formatData(formData);
  ipcRenderer.send('create-ias-email', data);
});
