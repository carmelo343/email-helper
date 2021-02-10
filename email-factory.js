const { shell } = require('electron');
const { render, renderFile } = require('template-file');
const fs = require('fs');

const templatePath = process.cwd() + '/eml-templates/';
//const templatePath = process.cwd() + '/resources/app/eml-templates/';
let emlSkeleton = "Subject: {{subject}}\nX-Unsent: 1\nContent-Type: text/html\n\n{{body}}<br><br><br>{{signature}}"

exports.createCompanyTaxEmail = formData => {
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

exports.createPersonalTaxEmail = data => {
  let subjectHTML = fs.readFileSync(templatePath + 'personal-tax/subject.html', 'utf8');
  let bodyHTML = fs.readFileSync(templatePath + 'personal-tax/body.html', 'utf8');
  let signatureHTML = fs.readFileSync(templatePath + 'signature.html', 'utf8');

  let email = { };
  email.subject = render(subjectHTML, data);
  email.body = render(bodyHTML, data);
  email.signature  = signatureHTML;

  fs.copyFileSync(templatePath + 'email.eml', templatePath + 'personal-tax/email.eml');
  let emlTemplate = fs.readFileSync(templatePath + 'personal-tax/email.eml', 'utf8');
  let emlStr = render(emlTemplate, email);
  fs.writeFileSync(templatePath + 'personal-tax/email.eml', emlStr);

  shell.openPath(templatePath + 'personal-tax/email.eml');

}

exports.createBasEmail = data => {
  let subjectHTML = fs.readFileSync(templatePath + 'bas/subject.html', 'utf8');
  let bodyHTML = fs.readFileSync(templatePath + 'bas/body.html', 'utf8');
  let signatureHTML = fs.readFileSync(templatePath + 'signature.html', 'utf8');

  let email = { };
  email.subject = render(subjectHTML, data);
  email.body = render(bodyHTML, data);
  email.signature  = signatureHTML;

  fs.copyFileSync(templatePath + 'email.eml', templatePath + 'bas/email.eml');
  let emlTemplate = fs.readFileSync(templatePath + 'bas/email.eml', 'utf8');
  let emlStr = render(emlTemplate, email);
  fs.writeFileSync(templatePath + 'bas/email.eml', emlStr);

  shell.openPath(templatePath + 'bas/email.eml');
}

exports.createIasEmail = data => {
  let subjectHTML = fs.readFileSync(templatePath + 'ias/subject.html', 'utf8');
  let bodyHTML = fs.readFileSync(templatePath + 'ias/body.html', 'utf8');
  let signatureHTML = fs.readFileSync(templatePath + 'signature.html', 'utf8');

  let email = { };
  email.subject = render(subjectHTML, data);
  email.body = render(bodyHTML, data);
  email.signature  = signatureHTML;

  fs.copyFileSync(templatePath + 'email.eml', templatePath + 'ias/email.eml');
  let emlTemplate = fs.readFileSync(templatePath + 'ias/email.eml', 'utf8');
  let emlStr = render(emlTemplate, email);
  fs.writeFileSync(templatePath + 'ias/email.eml', emlStr);

  shell.openPath(templatePath + 'ias/email.eml');
}

exports.createPayrollEmail = data => {
  let taxItemsHtml = [];
  taxItemsHtml.push('<ul>');
  data.taxItems.forEach(item => {
    taxItemsHtml.push(
      `<li>${item.state} Payroll Tax Return & Payment - `
    )
  });
}
