const { shell } = require('electron');
const { render, renderFile } = require('template-file');
const fs = require('fs');

const templatePath = process.cwd() + '/eml-templates/';
//const templatePath = process.cwd() + '/resources/app/eml-templates/';
let emlSkeleton = "Subject: {{subject}}\nX-Unsent: 1\nContent-Type: text/html\n\n{{body}}<br><br><br>{{signature}}"

exports.createEmail = formData => {
  let email = JSON.parse(fs.readFileSync(templatePath + 'company-tax.json'));
  let signatureHTML = fs.readFileSync(templatePath + 'signature.html');
  let signature = { signature: signatureHTML };

  email.subject = render(email.subject, formData);
  email.body = render(email.body, formData);
  email.signature = render(email.signature, signature);

  let emlStr = render(emlSkeleton, email);
  fs.writeFileSync(templatePath + 'company-tax.eml', emlStr);
  shell.openPath(templatePath + 'company-tax.eml');
}
