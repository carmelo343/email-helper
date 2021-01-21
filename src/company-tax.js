clientFirstName = document.getElementById("clientFirstName");
clientLastName = document.getElementById("clientLastName");
companyName = document.getElementById("companyName");
companyEntityType = document.getElementById("companyEntityType");
financialYear = document.getElementById("financialYear");
amountPayable = document.getElementById("amountPayable");
amountRefundable = document.getElementById("amountRefundable");
additionalInfo = document.getElementById("additionalInfo");
btnSubmit = document.getElementById("btnSubmit");

btnSubmit.addEventListener("click", function(){
    alert(clientFirstName.value);
});