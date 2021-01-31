const $ = jQuery = require('jquery');
const fs = require('fs');
const Quill = require('quill');

const templatePath = process.cwd() + '/eml-templates/';
//const templatePath = process.cwd() + '/resources/app/eml-templates/';

$(function () {
  var quilleditor = new Quill('#editor-container', {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ]
    },
    placeholder: 'Enter email signature...',
    theme: 'snow'
  });


  $('#btnSave').on('click', function () {
    let html = quilleditor.root.innerHTML;
    html = html.replaceAll('<p>', '<p style="margin: 0; padding: 0;">')
    fs.writeFileSync(templatePath + 'signature.html', html);
    alert('Signature saved successfully!');
  });

});
