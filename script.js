function validateCPF(cpf) {
  console.log(cpf)
  if (cpf.length != 11) {
    return false;
  } else {
    let numbers = cpf.substring(0, 9);
    const digits = cpf.substring(9);

    let sum = 0;
    for (let i = 10; i > 1; i--) {
      sum += numbers.charAt(10 - i) * i;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(0)) {
      return false;
    }

    sum = 0;
    numbers = cpf.substring(0, 10);

    for (let k = 11; k > 1; k--) {
      sum += numbers.charAt(11 - k) * k;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(1)) {
      return false;
    }

    return true;
  }
}

function generateCFP() {
  let numbers = "";
  let pos = 0;
  while (numbers.length <= 8) {
    pos = Math.floor(Math.random() * 10);
    numbers += pos.toString();
  }

  let sum = 0,
    mult = 0;
  for (let i = 0; i <= 8; i++) {
    sum = numbers.charAt(i) * (10 - i);
    mult += sum;
  }

  numbers += mult % 11 < 2 ? 0 : 11 - (mult % 11);

  sum = 0;
  mult = 0;
  for (let k = 0; k <= 9; k++) {
    sum = numbers.charAt(k) * (11 - k);
    mult += sum;
  }
  numbers += mult % 11 < 2 ? 0 : 11 - (mult % 11);
  numbers = formatCPF(numbers);
  document.getElementById("cpf_digitado").value = numbers;
  console.log(numbers);
}

function formatCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
}

function removeFormatCPF(cpf){
  cpf = cpf.replace(".", "");
  cpf = cpf.replace(".", "");
  cpf = cpf.replace("-", "");
  return cpf;
}

function validate() {
  document.getElementById("success").style.display = "none";
  document.getElementById("error").style.display = "none";

  const cpf = document.getElementById("cpf_digitado").value;
  const resultValidation = validateCPF(removeFormatCPF(cpf));

  if (resultValidation) {
    document.getElementById("success").style.display = "block";
  } else {
    document.getElementById("error").style.display = "block";
  }
}

function format() {
  let numbers = document.getElementById("cpf_digitado").value;  
  document.getElementById("cpf_digitado").value = formatCPF(numbers);
}

// Algoritmo para geração de CPF - https://www.geradorcpf.com/algoritmo_do_cpf.htm
