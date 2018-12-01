let uf = null;
let ie = null;
// inscricaoEstadualValidator
export default {
  validar(UF, IE){
    uf = UF.toUpperCase();
    ie = IE;

    switch(uf){
      case "AC":
        return validateAC();
      case "AL":
        return validateAL();
      case "AP":
        return validateAP();
      case "AM":
        return validateAM();
      case "BA":
        return validateBA();
      case "CE":
        return validateCE();
      case "DF":
        return validateDF();
      case "ES":
        return validateES();
      case "GO":
        return validateGO();
      case "MA":
        return validateMA();
      case "MT":
        return validateMT();
      case "MS":
        return validateMS();
      case "MG":
        return validateMG();
      case "PA":
        return validatePA();
      case "PB":
        return validatePB();
      case "PR":
        return validatePR();
      case "PE":
        return validatePE();
      case "PI":
        return validatePI();
      case "RJ":
        return validateRJ();
      case "RN":
        return validateRN();
      case "RS":
        return validateRS();
      case "RO":
        return validateRO();
      case "RR":
        return validateRR();
      case "SC":
        return validateSC();
      case "SP":
        return validateSP();
      case "SE":
        return validateSE();
      case "TO":
        return validateTO();
    }
  },//end validar()


  testaInscricoesEstaduais(){
    let validos = [
      ['0198293945680', 'AC'],
      ['248619365', 'AL'],
      ['035248815', 'AP'],
      ['765758156', 'AM'],
      ['05460212', 'BA'],
      //['05460212', 'BA'],//TODO: Falta validar o de 9 digitos
      ['156865505', 'CE'],
      ['0761045000189', 'DF'],
      ['662569857', 'ES'],
      ['153683180', 'GO'],
      ['123358019', 'MA'],
      ['88743069688', 'MT'],//['123456789', 'MT'],//Não devia validar
      //['88743069688', 'MT'], //TODO:Falta validar o de 8 digitos
      ['288252128', 'MS'],
      ['0418145586081', 'MG'],
      ['152338284', 'PA'],
      ['136814620', 'PB'],
      ['7348032431', 'PR'],
      ['963975943', 'PE'],
      //['963975943', 'PE'],//TODO: Falta validar o de 14 digitos
      ['055790810', 'PI'],
      ['08088284', 'RJ'],
      ['208437800', 'RN'],
      //['208437800', 'RN'],//TODO:Falta validar o de 10 digitos
      ['9994822344', 'RS'],
      ['70946458251850', 'RO'],
      //['70946458251850', 'RO'],//TODO:Falta validar o de 9 digitos
      ['247651415', 'RR'],//DANDO ERRO
      ['602235951280', 'SP'],
      //['602235951280', 'SP'],//TODO:Falta validar o Rural
      ['030078830', 'SC'],
      ['317085034', 'SE'],
      ['36038217094', 'TO'],
      //['36038217094', 'TO'],//TODO: Falta validar o de 9 digitos
    ];

    let invalidos = [
      ['0198293945681', 'AC'],
      ['248619366', 'AL'],
      ['035248816', 'AP'],
      ['765758157', 'AM'],
      ['05460213', 'BA'],
      //['05460212', 'BA'],//TODO: Falta validar o de 9 digitos
      ['156865506', 'CE'],
      ['0761045000180', 'DF'],
      ['662569858', 'ES'],
      ['153683181', 'GO'],//Dando erro
      ['123358010', 'MA'],
      ['91286329101', 'MT'],
      //['88743069688', 'MT'], //TODO:Falta validar o de 8 digitos
      ['288252129', 'MS'],
      ['0418145586082', 'MG'],
      ['152338285', 'PA'],
      ['136814621', 'PB'],
      ['7348032432', 'PR'],
      ['963975944', 'PE'],
      //['963975943', 'PE'],//TODO: Falta validar o de 14 digitos
      ['055790811', 'PI'],
      ['08088285', 'RJ'],
      ['208437801', 'RN'],
      //['208437800', 'RN'],//TODO:Falta validar o de 10 digitos
      ['9994822345', 'RS'],
      ['70946458251851', 'RO'],
      //['70946458251850', 'RO'],//TODO:Falta validar o de 9 digitos
      ['240067652', 'RR'],
      ['602235951281', 'SP'],
      //['602235951280', 'SP'],//TODO:Falta validar o Rural
      ['262869004', 'SC'],//DANDO ERRO no site
      ['317085035', 'SE'],
      ['36038217095', 'TO'],
      //['36038217094', 'TO'],//TODO: Falta validar o de 9 digitos
    ]

    console.log("testando os validos:")
    for(var inscr of validos){
      if(!this.validar(inscr[1], inscr[0])){
        console.log("falhou em: " + inscr[1])
      }
    }

    console.log("testando os inválidos:")
    for(var inscr of invalidos){
      if(this.validar(inscr[1], inscr[0])){
        console.log("falhou em: " + inscr[1])
      }
    }

  }
}
function validateAC (){
  /* * VERIFICAÇÃO 1 * onze dígitos mais dois dígitos verificadores  */
  if(ie.length !=13){
    return false;
  }
  let caracteres = ie.split('');
  let number_01 = caracteres[0];
  let number_02 = caracteres[1];
  let dv_01 = caracteres[11];
  let dv_02 = caracteres[12];
  /*  * VERIFICAÇÃO 2 * os dois primeiros dígitos são sempre 01 (número do estado)  */
  if(number_01!=0 || number_02!=1){
    return false;
  }
  let remontagem_01 = caracteres[0]+caracteres[1]+caracteres[2];
  let caracteresRemontagem_01 = remontagem_01.split('');
  let i = 0;
  let soma = 0;
  for(let j=4; j>1; j--){
    soma += j * caracteresRemontagem_01[i];
    i++;
  }
  let remontagem_02 = caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7]+caracteres[8]+caracteres[9]+caracteres[10];
  let caracteresRemontagem_02 = remontagem_02.split('');
  i = 0;
  for(var j=9; j>1; j--){
    soma += j * caracteresRemontagem_02[i];
    i++;
  }
  let resto = soma%11;
  let dv_01_obtido = 11-resto;
  if(dv_01_obtido===10 || dv_01_obtido===11){
    dv_01_obtido = 0;
  }
  /* * VERIFICAÇÃO 3 * dígitos devem coincidir  */
  if(dv_01!=dv_01_obtido){
    return false;
  }
  let remontagem_03 = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3];
  let caracteresRemontagem_03 = remontagem_03.split('');
  i = 0;
  soma = 0;
  for(j=5; j>1; j--){
    soma += j * caracteresRemontagem_03[i];
    i++;
  }
  let remontagem_04 = caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7]+caracteres[8]+caracteres[9]+caracteres[10]+dv_01_obtido;
  let caracteresRemontagem_04 = remontagem_04.split('');
  i = 0;
  for(j=9; j>1; j--){
    soma += j * caracteresRemontagem_04[i];
    i++;
  }
  resto = soma%11;
  let dv_02_obtido = 11-resto;
  if(dv_02_obtido===10 || dv_02_obtido===11){
    dv_02_obtido = 0;
  }
  /* * VERIFICAÇÃO 4  * dígitos devem coincidir   */
  if(dv_02!=dv_02_obtido){
    return false;
  }
  return true;
};
function validateAL (){
  // /*  * VERIFICAÇÃO 1 * nove dígitos */
  if(ie.length != 9){
    return false;
  }
  let caracteres = ie.split('');
  var number_01 = caracteres[0];
  var number_02 = caracteres[1];
  var tipoEmpresa = caracteres[2];
  var dv = caracteres[8];
  // /*  * VERIFICAÇÃO 2  * os dois primeiros dígitos são o código do estado: 24  */
  if(number_01 != 2 || number_02 != 4){
    return false;
  }

  var remontagem = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];
  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  // dv_obtido = (soma*10)-(int)((soma*10)/11)*11;
  var resto = soma % 11;
  var dv_obtido = 11 - resto;
  if(dv_obtido == 10){
    dv_obtido = 0;
  }
  // /* VERIFICAÇÃO 4*/
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateAP(){
  /* VERIFICAÇÃO 1 */
  if(ie.length != 9){
    return false;
  }
  let caracteres = ie.split('');
  var number_01 = caracteres[0];
  var number_02 = caracteres[1];
  var dv = caracteres[8];

  /* VERIFICAÇÃO 2 código do estado: 03 */
  if(number_01 != 0 || number_02 != 3){
    return false;
  }
  var remontagem = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];

  var p = null;
  var d = null;
  if(remontagem>="03000001" && remontagem<="03017000"){
    p = 5;
    d = 0;
  }
  else if(remontagem>="03017001" && remontagem<="03019022"){
    p = 9;
    d = 1;
  }
  else if(remontagem>="03019023"){
    p = 0;
    d = 0;
  }

  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  soma += p;
  var resto = soma % 11;
  var dv_obtido = 11 - resto;
  if(dv_obtido == 10){
    dv_obtido = 0;
  }else if(dv_obtido == 11){
    dv_obtido = d;
  }
  /* VERIFICAÇÃO 3*/
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateAM(){
  /* VERIFICAÇÃO 1 */
  if(ie.length != 9){
    return false;
  }
  let caracteres = ie.split('');
  var dv= caracteres[8];
  var remontagem = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];
  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  var dv_obtido = null;
  var resto = null;

  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  if(soma<11){
    dv_obtido = 11-soma;
  }
  else{
    resto = soma % 11;
    if(resto <= 1){
      dv_obtido = 0;
    }
    else{
      dv_obtido = 11 - resto;
    }
  }
  /* VERIFICAÇÃO 3 */
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateBA(){
  /* VERIFICAÇÃO 1: Bahia pode ter 2 tipos de ie, com 8 e com 9 dígitos */
  if(ie.length != 8 && ie.length != 9){
    return false;
  }
  return ie.length == 8 ? validateBA_8D() : validateBA_9D();
};
function validateBA_8D(){
  let caracteres = ie.split('');
  if(caracteres[0] == 0 || caracteres[0] == 1 || caracteres[0] == 2 || caracteres[0] == 3 || caracteres[0] == 4 || caracteres[0] == 5 || caracteres[0] == 8){
    //Para Inscrições cujo primeiro dígito da I.E. é 0,1,2,3,4,5,8 cálculo pelo módulo 10:
    return validateBA_8D_Modulo(10, caracteres);
  }
  else{
    //Para Inscrições cujo primeiro dígito da I.E. é 6,7,9 cálculo pelo módulo 11:
    return validateBA_8D_Modulo(11, caracteres);
  }
};
function validateBA_9D(){
  let caracteres = ie.split('');
  if(caracteres[1] == 0 || caracteres[1] == 1 || caracteres[1] == 2 || caracteres[1] == 3 || caracteres[1] == 4 || caracteres[1] == 5 || caracteres[1] == 8){
    //Para Inscrições cujo primeiro dígito da I.E. é 0,1,2,3,4,5,8 cálculo pelo módulo 10:
    return validateBA_9D_Modulo(10, caracteres);
  }
  else{
    //Para Inscrições cujo primeiro dígito da I.E. é 6,7,9 cálculo pelo módulo 11:
    return validateBA_9D_Modulo(11, caracteres);
  }
  return true;
};
function validateBA_8D_Modulo(modulo, caracteres){
  var dv_01 = caracteres[6];
  var dv_02 = caracteres[7];
  var remontagem_01 = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5];
  var caracteresRemontagem_01 = remontagem_01.split('');
  var i = 0;
  var soma = 0;
  var dv_02_obtido = 0;
  for(var j = 7; j>1; j--){
    soma += j * caracteresRemontagem_01[i];
    i++;
  }
  var resto = soma % modulo;
  if(resto == 0)
  {dv_02_obtido = 0;
  }else{
    dv_02_obtido = modulo - resto;
  }
  /* VERIFICAÇÃO 01: */
  if(dv_02 != dv_02_obtido){
    return false;
  }
  var remontagem_02 = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+dv_02_obtido;
  var caracteresRemontagem_02 = remontagem_02.split('');
  i = 0;
  soma = 0;
  for(var j=8; j>1; j--){
    soma += j * caracteresRemontagem_02[i];
    i++;
  }
  resto = soma % modulo;
  var dv_01_obtido = null;
  if(resto == 0){
    dv_01_obtido = 0;
  }else{
    dv_01_obtido = modulo - resto;
  }
  /* VERIFICAÇÃO 02: */
  if(dv_01 != dv_01_obtido){
    return false;
  }
  return true;
};
function validateBA_9D_Modulo(modulo, caracteres){
  var dv_01 = caracteres[7];
  var dv_02 = caracteres[8];
  var remontagem_01 = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6];
  var caracteresRemontagem_01 = remontagem_01.split('');
  var i = 0;
   var soma = 0;
  for(var j = 8; j > 1; j--){
    soma += j * caracteresRemontagem_01[i];
    i++;
  }
  var dv_02_obtido = null;
  var resto = soma % modulo;
  if(resto == 0){dv_02_obtido = 0;}
  else{dv_02_obtido = modulo - resto;}
  /* VERIFICAÇÃO 01: */
  if(dv_02 != dv_02_obtido){
    return false;
  }
  var remontagem_02 = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+dv_02_obtido;
  var caracteresRemontagem_02 = remontagem_02.split('');
  i = 0;
  soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem_02[i];
    i++;
  }
  var dv_01_obtido = null;
  resto = soma % modulo;
  if(resto == 0){
    dv_01_obtido = 0;
  }else{
    dv_01_obtido = modulo - resto;
  }
  /*  VERIFICAÇÃO 02: */
  if(dv_01 != dv_01_obtido){
    return false;
  }
  return true;
};
function validateCE(){
  /* VERIFICAÇÃO 1 */
  if(ie.length != 9){
    return false;
  }
  let caracteres = ie.split('');
  var dv = caracteres[8];
  var remontagem = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];
  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  var resto = soma % 11;
  var dv_obtido = 11 - resto;
  if(dv_obtido == 10 || dv_obtido == 11){
    dv_obtido = 0;
  }
  /* VERIFICAÇÃO 2 */
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateDF(){
  /* VERIFICAÇÃO 1*/
  if(ie.length != 13){
    return false;
  }
  let caracteres = ie.split('');
  /* VERIFICAÇÃO 2 campos fixos (07) */
  if(caracteres[0] != 0 && caracteres[1] != 7){
    return false;
  }
  var dv_01 = caracteres[11];
  var remontagem_01 = caracteres[0]+caracteres[1]+caracteres[2];
  var caracteresRemontagem_01 = remontagem_01.split('');
  var i = 0;
  var soma = 0;
  for(var j = 4; j > 1; j--){
    soma += j * caracteresRemontagem_01[i];
    i++;
  }
  var remontagem_02 = caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7]+caracteres[8]+caracteres[9]+caracteres[10];
  var caracteresRemontagem_02 = remontagem_02.split('');
  i = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem_02[i];
    i++;
  }
  var resto = soma % 11;
  var dv_01_obtido = 11 - resto;
  if(dv_01_obtido == 10 || dv_01_obtido == 11){
    dv_01_obtido = 0;
  }
  /* VERIFICAÇÃO 2 */
  if(dv_01 != dv_01_obtido){
    return false;
  }
  var dv_02 = caracteres[12];
  var remontagem_03 = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3];
  var caracteresRemontagem_03 = remontagem_03.split('');
  i = 0;
  soma = 0;
  for(var j = 5; j > 1; j--){
    soma += j * caracteresRemontagem_03[i];
    i++;
  }
  var remontagem_04 = caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7]+caracteres[8]+caracteres[9]+caracteres[10]+dv_01_obtido;
  var caracteresRemontagem_04 = remontagem_04.split('');
  i = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem_04[i];
    i++;
  }
  resto = soma % 11;
  var dv_02_obtido = 11 - resto;
  if(dv_02_obtido == 10 || dv_02_obtido == 11){
    dv_02_obtido = 0;
  }
  /* VERIFICAÇÃO 3 */
  if(dv_02 != dv_02_obtido){
    return false;
  }
  return true;
};
function validateES(){
  /* VERIFICAÇÃO 1 */
  if(ie.length != 9){
    return false;
  }
  let caracteres = ie.split('');
  var dv = caracteres[8];
  var remontagem = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];
  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  var resto = soma % 11;
  if(resto < 2){
    var dv_obtido = 0;
  }
  else{
    dv_obtido = 11 - resto;
  }
  /* VERIFICAÇÃO 2 */
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateGO(){
  /* VERIFICAÇÃO 1: */
  if(ie.length !=9){
    return false;
  }
  let caracteres = ie.split('');
  var ab = caracteres[0]+caracteres[1];
  /* VERIFICAÇÃO 2: dois primeiros dígitos devem ser 10, 11 ou 15 */
  if(ab != 10 && ab != 11 && ab != 15){
    return false;
  }
  var dv = caracteres[8];
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteres[i];
    i++;
  }
  var resto = soma % 11;
  /* VERIFICAÇÃO 3: */
  if(ie == 11094402 && dv != 0 && dv != 1){
    return false;
  }
  /* VERIFICAÇÃO 4: */
  if(resto == 0 && dv != 0){
    return false;
  }
  /* VERIFICAÇÃO 5: */
  if(resto == 1 && ie >= 10103105 && ie <= 10119997 && dv != 1){
    return false;
  }
  /* VERIFICAÇÃO 6: */
  if(resto == 1 && ie < 10103105 && ie > 10119997 && dv != 0){
    return false;
  }
  /* VERIFICAÇÃO 7: */
  if(resto != 1 && resto != 0 && dv != (11 - resto)){
    return false;
  }
  return true;
};
function validateMA(){
  // /* VERIFICAÇÃO 1*/
  if(ie.length != 9){
    return false;
  }
  let caracteres = ie.split('');
  var number_01 = caracteres[0];
  var number_02 = caracteres[1];
  /* VERIFICAÇÃO 1 número fixo do estado: 12 */
  if(number_01 != 1 || number_02 != 2){
    return false;
  }
  var dv = caracteres[8];
  var remontagem = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];
  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  var resto = soma % 11;
  if(resto == 0 || resto == 1){
    var dv_obtido = 0;
  }
  else{
    dv_obtido = 11-resto;
  }
  /* VERIFICAÇÃO 2 */
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateMT(){
  // /* VERIFICAÇÃO 1*/
  if(ie.length !=11 && ie.length != 9){
    return false;
  }
  if(ie.length == 11){
    return validateMT_11D();
  }
  if(ie.length == 9){
    return validateMT_9D();
  }
};
function validateMT_11D(){
  let caracteres = ie.split('');
  var dv = caracteres[10];
  var remontagem_01 = caracteres[0]+caracteres[1];
  var caracteresRemontagem_01 = remontagem_01.split('');
  var i = 0;
  var soma = 0;
  for(var j = 3; j > 1; j--){
    soma += j * caracteresRemontagem_01[i];
    i++;
  }
  var remontagem_02 = caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7]+caracteres[8]+caracteres[9];
  var caracteresRemontagem_02 = remontagem_02.split('');
  i = 0;
  soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem_02[i];
    i++;
  }
  var resto = soma % 11;
  if(resto < 2){
    var dv_obtido = 0;
  }
  else{
    dv_obtido = 11-resto;
  }
  if(dv_obtido != dv){
    return false;
  }
  return true;
};
function validateMT_9D(){
  let caracteres = ie.split('');
  var dv = caracteres[8];
  var remontagem = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];
  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  var resto = soma % 11;
  if(resto < 2){
    var dv_obtido = 0;
  }
  else{
    dv_obtido = 11 - resto;
  }
  if(dv_obtido != dv){
    return false;
  }
  return true;
};
function validateMS(){
  /* VERIFICAÇÃO 1 */
  if(ie.length != 9){
    return false;
  }
  let caracteres = ie.split('');
  var number_01 = caracteres[0];
  var number_02 = caracteres[1];
  /* VERIFICAÇÃO 1 número fixo do estado: 28 */
  if(number_01 != 2 || number_02 != 8){
    return false;
  }
  var dv = caracteres[8];
  var remontagem = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];
  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  var resto = soma % 11;
  if(resto == 0){
    var dv_obtido = 0;
  }
  else if(resto>0){
    var t = 11-resto;
    if(t > 9){
      dv_obtido = 0;
    }
    else{
      dv_obtido = t;
    }
  }
  /* VERIFICAÇÃO 2*/
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateMG(){
  /* VERIFICAÇÃO 1*/
  if(ie.length != 13){
    return false;
  }
  let caracteres = ie.split('');
  var dv_01 = caracteres[11];
  var dv_02 = caracteres[12];
  var remontagem_01 = caracteres[0]+caracteres[1]+caracteres[2]+"0"+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7]+caracteres[8]+caracteres[9]+caracteres[10];
  var caracteresRemontagem_01 = remontagem_01.split('');
  var concat = "";
  var i = 1;
  for(var j = 0; j < caracteresRemontagem_01.length; j++){
    concat += i * caracteresRemontagem_01[j];
    if(i == 1){
      i = 2;
    }else{
      i=1;
    }
  }
  var caracteres_concat= concat.split('');
  var soma = 0;
  for(i=0; i < concat.length; i++){
    soma += parseInt(caracteres_concat[i]);
  }
  var caracteresSoma = soma.toString().split('');
  var dezena = caracteresSoma[0]+1;
  dezena += "0";
  var dv_01_obtido = dezena - soma;
  //correção bug
  if(dv_01_obtido == 10){
    dv_01_obtido = 0;
  }
  /* VERIFICAÇÃO 2: */
  if(dv_01 != dv_01_obtido){
    return false;
  }
  var remontagem_02 = caracteres[0]+caracteres[1];
  var caracteresRemontagem_02 = remontagem_02.split('');
  i = 0;
  soma = 0;
  for(j = 3; j > 1; j--){
    soma += j * caracteresRemontagem_02[i];
    i++;
  }
  var remontagem_03 = caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7]+caracteres[8]+caracteres[9]+caracteres[10]+dv_01_obtido;
  var caracteresRemontagem_03 = remontagem_03.split('');
  i = 0;
  for(var j = 11; j > 1; j--){
    soma += j * caracteresRemontagem_03[i];
    i++;
  }
  var resto = soma%11;
  if(resto==1 || resto==0){
    var dv_02_obtido = 0;
  }
  else{
    dv_02_obtido = 11-resto;
  }
  /* VERIFICAÇÃO 3: */
  if(dv_02 != dv_02_obtido){
    return false;
  }
  return true;
};
function validatePA(){
  /* VERIFICAÇÃO 1 oito dígitos mais um dígito verificador*/
  if(ie.length != 9){
    return false;
  }
  let caracteres = ie.split('');
  var number_01 = caracteres[0];
  var number_02 = caracteres[1];

  /* VERIFICAÇÃO 2número fixo do estado: 15 */
  if(number_01 != 1 || number_02 != 5){
    return false;
  }
  var dv = caracteres[8];
  var remontagem = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];
  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  var resto = soma % 11;
  if(resto == 0 || resto == 1){
    var dv_obtido = 0;
  }
  else{
    dv_obtido = 11-resto;
  }
  /* VERIFICAÇÃO 2 */
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validatePB(){
  /* VERIFICAÇÃO 1: */
  if(ie.length != 9){
    return false;
  }
  let caracteres = ie.split('');
  var dv = caracteres[8];
  var i = 0;
  var soma = 0;
  for(var j = 9; j>1; j--){
    soma += j * caracteres[i];
    i++;
  }
  var resto = soma % 11;
  var dv_obtido = 11 - resto;
  if(dv_obtido == 10 || dv_obtido == 11){
    dv_obtido = 0;
  }
  /* VERIFICAÇÃO 2: dígitos devem coincidir */
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validatePR(){
  /* VERIFICAÇÃO 1: */
  if(ie.length != 10){
    return false;
  }
  let caracteres = ie.split('');
  var dv_01 = caracteres[8];
  var dv_02 = caracteres[9];
  var remontagem_01 = caracteres[0]+caracteres[1];
  var caracteresRemontagem_01 = remontagem_01.split('');
  var i = 0;
  var soma = 0;
  for(var j = 3; j > 1; j--){
    soma += j * caracteresRemontagem_01[i];
    i++;
  }
  var remontagem_02 = caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];
  var caracteresRemontagem_02 = remontagem_02.split('');
  i = 0;
  for(var j = 7; j > 1; j--){
    soma += j * caracteresRemontagem_02[i];
    i++;
  }
  var resto = soma % 11;
  var dv_01_obtido = 11-resto;
  if(dv_01_obtido == 10 || dv_01_obtido == 11){
    dv_01_obtido = 0;
  }
  /* VERIFICAÇÃO 2: */
  if(dv_01 != dv_01_obtido){
    return false;
  }
  var remontagem_03 = caracteres[0]+caracteres[1]+caracteres[2];
  var caracteresRemontagem_03 = remontagem_03.split('');
  i = 0;
  soma = 0;
  for(var j = 4; j > 1; j--){
    soma += j * caracteresRemontagem_03[i];
    i++;
  }
  var remontagem_04 = caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7]+dv_01_obtido;
  var caracteresRemontagem_04 = remontagem_04.split('');
  i = 0;
  for(var j = 7; j > 1; j--){
    soma += j * caracteresRemontagem_04[i];
    i++;
  }
  resto = soma % 11;
  var dv_02_obtido = 11 - resto;
  if(dv_02_obtido == 10 || dv_02_obtido == 11){
    dv_02_obtido = 0;
  }
  /* VERIFICAÇÃO 3:*/
  if(dv_02!=dv_02_obtido){
    return false;
  }
  return true;
};
function validatePE(){
  /** VERIFICAÇÃO 1: inscrição estadual do e-Fisco: 9 dígitos inscrição antiga: 14 dígitos */
  if(ie.length == 9){
    return validatePE_9D();
  }
  else if(ie.length == 14){
    return validatePE_14D();
  }
  else{
    return false;
  }
};
function validatePE_9D(){
  let caracteres = ie.split('');
  var dv_01 = caracteres[7];
  var dv_02 = caracteres[8];
  var remontagem_01 = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6];
  var caracteresRemontagem_01 = remontagem_01.split('');
  var i = 0;
  var soma = 0;
  i = 0;
  for(var j = 8; j > 1; j--){
    soma += j * caracteresRemontagem_01[i];
    i++;
  }
  var resto = soma % 11;
  if(resto == 0 || resto == 1){
    var dv_01_obtido = 0;
  }
  else{
    dv_01_obtido = 11-resto;
  }
  /* VERIFICAÇÃO 1 */
  if(dv_01 != dv_01_obtido){
    return false;
  }
  var remontagem_02 = remontagem_01+dv_01_obtido;
  var caracteresRemontagem_02 = remontagem_02.split('');
  i = 0;
  soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem_02[i];
    i++;
  }
  resto = soma % 11;
  if(resto == 0 || resto == 1){
    var dv_02_obtido = 0;
  }
  else{
    dv_02_obtido = 11 - resto;
  }
  /* * VERIFICAÇÃO 2 */
  if(dv_02 != dv_02_obtido){
    return false;
  }
  return true;
};
function validatePE_14D(){
  let caracteres = ie.split('');
  var dv = caracteres[13];
  var remontagem_01 = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4];
  var caracteresRemontagem_01 = remontagem_01.split('');
  var i = 0;
  i = 0;
  var soma = 0;
  for(var j = 5; j > 1; j--){
    soma += j * caracteresRemontagem_01[i];
    i++;
  }
  var remontagem_02 = caracteres[5]+caracteres[6]+caracteres[7]+caracteres[8]+caracteres[9]+caracteres[10]+caracteres[11]+caracteres[12];
  var caracteresRemontagem_02 = remontagem_02.split('');
  i = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem_02[i];
    i++;
  }
  var resto = soma % 11;
  var dv_obtido = 11 - resto;
  if(dv_obtido > 9){
    dv_obtido = dv_obtido - 10;
  }
  /* VERIFICAÇÃO 1 */
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validatePI(){
  /* VERIFICAÇÃO 1: */
  if(ie.length != 9){
    return false;
  }
  let caracteres = ie.split('');
  var dv = caracteres[8];

  var remontagem_01 = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];
  var caracteresRemontagem_01 = remontagem_01.split('');
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem_01[i];
    i++;
  }
  var resto = soma % 11;
  var dv_obtido = 11 - resto;
  if(dv_obtido == 10 || dv_obtido == 11){
    dv_obtido = 0;
  }
  /* VERIFICAÇÃO 2*/
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateRJ(){
  /* VERIFICAÇÃO 1:*/
  if(ie.length != 8){
    return false;
  }
  let caracteres = ie.split('');
  var dv = caracteres[7];
  var remontagem = ie.substring(0, -1);
  var caracteresRemontagem = remontagem.split('');
  var i = 1;
  var soma = (caracteres[0] * 2);
  for(var j = 7; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  var resto = soma % 11;
  if(resto <= 1){
    var dv_obtido = 0;
  }
  else{
    dv_obtido = 11 - resto;
  }
  /* VERIFICAÇÃO 2 */
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateRN(){
  /* * VERIFICAÇÃO 1:*/
  if(ie.length == 9){
    return validateRN_9D();
  }
  else if(ie.length == 10){
    return validateRN_10D();
  }
  else return false;
};
function validateRN_9D(){
  let caracteres = ie.split('');
  var number_01 = caracteres[0];
  var number_02 = caracteres[1];
  /* VERIFICAÇÃO 1: número do estado: 20 */
  if(number_01 != 2 || number_02 != 0){
    return false;
  }
  var dv = caracteres[8];
  var remontagem = ie.substring(0, -1);
  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  soma = soma * 10;
  var resto = soma % 11;
  if(resto == 10){
    var dv_obtido = 0;
  }
  else{
    dv_obtido = resto;
  }
  /* VERIFICAÇÃO 2 */
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateRN_10D(){
  let caracteres = ie.split('');
  var number_01 = caracteres[0];
  var number_02 = caracteres[1];
  /* VERIFICAÇÃO 1: número do estado: 20*/
  if(number_01 != 2 || number_02 != 0){
    return false;
  }
  var dv = caracteres[9];
  var remontagem = ie.substring(0, -1);
  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  for(var j = 10; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  soma = soma * 10;
  var resto = soma % 11;
  if(resto==10){
    var dv_obtido=0;
  }
  else{
    dv_obtido = resto;
  }
  /* VERIFICAÇÃO 2*/
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateRS(){
  /* VERIFICACAO 1 */
  if(ie.length != 10){
    return false;
  }
  let caracteres = ie.split('');
  var dv = caracteres[9];
  var remontagem = ie.substring(0, -1);
  var caracteresRemontagem = remontagem.split('');
  var i = 1;
  var soma = (caracteres[0] * 2);
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  var resto = soma % 11;
  var dv_obtido = 11 - resto;
  if(dv_obtido == 10 || dv_obtido == 11){
    dv_obtido = 0;
  }
  /* VERIFICAÇÃO 2 */
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateRO(){
  /* VERIFICACAO 1*/
  if(ie.length == 9){
    return validateRO_9D();
  }
  else if(ie.length == 14){
    return validateRO_14D();
  }
};
function validateRO_9D(){
  let caracteres = ie.split('');
  var dv = caracteres[8];
  var remontagem = caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];
  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  for(var j = 6; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  var resto = soma % 11;
  var dv_obtido = 11 - resto;
  if(dv_obtido == 10 || dv_obtido == 11){
    dv_obtido = dv_obtido-10;
  }
  /* VERIFICAÇÃO 1 */
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateRO_14D(){
  let caracteres = ie.split('');
  var dv = caracteres[13];
  var remontagem_01 = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4];
  var caracteresRemontagem_01 = remontagem_01.split('');
  var i = 0;
  var soma = 0;
  for(j = 6; j > 1; j--){
    soma += j * caracteresRemontagem_01[i];
    i++;
  }
  var remontagem_02 = caracteres[5]+caracteres[6]+caracteres[7]+caracteres[8]+caracteres[9]+caracteres[10]+caracteres[11]+caracteres[12];
  var caracteresRemontagem_02 = remontagem_02.split('');
  i = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem_02[i];
    i++;
  }
  var resto = soma%11;
  var dv_obtido = 11-resto;
  if(dv_obtido==10 || dv_obtido==11){
    dv_obtido=dv_obtido-10;;
  }
  /* VERIFICAÇÃO 1 */
  if(dv!=dv_obtido){
    return false;
  }
  return true;
};
function validateRR(){
  /* VERIFICACAO 1 */
  if(ie.length != 9){
    return false;
  }
  var remontagem = ie.substring(0, -1);
  var dv = ie.substring(-1);
  var caracteresRemontagem = remontagem.split('');
  var soma = 0;
  for(var i = 0; i < caracteresRemontagem.length; i++){
    soma += (i+1) * caracteresRemontagem[i];
  }
  var dv_obtido = soma % 11;
  /* VERIFICAÇÃO 2*/
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateSC(){
  /* VERIFICACAO 1*/
  if(ie.length != 9){
    return false;
  }
  var remontagem = ie.substring(0, -1);
  var dv = ie.substring(-1);
  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  var resto = soma % 11;
  if(resto == 0 || resto == 1){
    var dv_obtido = 0;
  }
  else{
    dv_obtido = 11-resto;
  }
  // * VERIFICAÇÃO 2
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateSP(){
  /*
  * São Paulo possui dois tipos de IE: Industriais e Comerciantes no formato 110.042.490.114
  * e Produtor Rural no formato P-01100424.3/002, então verificamos o primeiro dígito para
  * determinar o tipo de validação a ser feita.
  */
  var caracteres = ie.split('');
  return caracteres[0] == "P" ? validateSpRural() : validateSpIndustrial();
};
function validateSpIndustrial(){
  /* VERIFICAÇÃO 1: doze dígitos */
  if(ie.length != 12){
    return false;
  }
  let caracteres = ie.split('');
  var dv_01 = caracteres[8];
  var dv_02 = caracteres[11];
  var remontagem_01 = caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6];
  var caracteresRemontagem_01 = remontagem_01.split('');
  var i = 0;
  var soma = 0;
  for(var j = 3; j <= 8; j++){
    soma += j * caracteresRemontagem_01[i];
    i++;
  }
  soma += caracteres[0] + (caracteres[7] * 10);
  var resto = "" + soma % 11;
  var dv_01_obtido = resto[resto.length - 1];

  /* VERIFICAÇÃO 2:*/
  if(dv_01 != dv_01_obtido){
    return false;
  }
  var remontagem_02 = caracteres[0]+caracteres[1];
  var caracteresRemontagem_02 = remontagem_02.split('');
  i = 0;
  soma = 0;
  for(j=3; j>1; j--){
    soma += j * caracteresRemontagem_02[i];
    i++;
  }
  var remontagem_03 = caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7]+caracteres[8]+caracteres[9]+caracteres[10];
  var caracteresRemontagem_03 = remontagem_03.split('');
  i = 0;
  for(var j = 10; j > 1; j--){
    soma += j * caracteresRemontagem_03[i];
    i++;
  }
  resto = "" + soma % 11;
  var  dv_02_obtido = resto[resto.length - 1];
  /* VERIFICAÇÃO 3:*/
  if(dv_02 != dv_02_obtido){
    return false;
  }
  return true;
};
function validateSpRural(){
  /* VERIFICAÇÃO 1: */
  if(ie.length != 13){
    return false;
  }
  var caracteres = ie.split('');
  var dv = caracteres[9];
  var remontagem_01 = caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];
  var caracteresRemontagem_01 = remontagem_01.split('');
  var i = 0;
  var soma = 0;
  for(var j = 3; j <= 10; j++){
    soma += j * caracteresRemontagem_01[i];
    i++;
  }
  soma += caracteres[1] + (caracteres[8] * 10);
  var resto = "" + soma % 11;
  var dv_obtido = resto[resto.length - 1];
  /* VERIFICAÇÃO 2: dígitos devem coincidir */
  if(dv != dv_obtido){
    return false;
  }
  return true;
};
function validateSE(){
  /*  * VERIFICACAO 1*/
  if(ie.length != 9){
    return false;
  }
  var remontagem = ie.substring(0, -1);
  var dv = ie.substring(-1);
  var caracteresRemontagem = remontagem.split('');
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  var resto = soma % 11;
  if(resto == 10 || resto == 11){
    var dv_obtido = 0;
  }
  else{
    dv_obtido = 11-resto;
  }
  /* VERIFICAÇÃO 2 */
  if(dv!=dv_obtido){
    return false;
  }
  return true;
};
function validateTO(){
  /* No Tocantins pode-se ou não informar os dígitos que determinam o tipo de empresa*/
  if(ie.length == 11){
    return validateTO_11D();
  }
  else if(ie.length == 9){
    return validateTO_9D();
  }
  else return false;
};
function validateTO_11D(){
  let caracteres = ie.split('');
  var digitos_34 = caracteres[2]+caracteres[3];
  var dv = caracteres[10];
  var remontagem = caracteres[0]+caracteres[1]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7]+caracteres[8]+caracteres[9];
  var caracteresRemontagem = remontagem.split('');
  /*
  * VERIFICAÇÃO 1:
  * o terceiro e quarto dígitos não entram na conta, mas só podem assumir os seguintes valores:
  * 01 = Produtor Rural (não possui CGC)
  * 02 = Industria e Comércio
  * 03 = Empresas Rudimentares
  * 99 = Empresas do Cadastro Antigo (SUSPENSAS)
  */
  if(digitos_34 != "01" && digitos_34 != "02" && digitos_34 != "03" && digitos_34 != "99"){
    return false;
  }
  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  var resto = soma % 11;
  /* VERIFICAÇÃO 2: se resto menor que dois, dígito == 0 */
  if(resto < 2 && dv != 0){
    return false;
  }
  /* VERIFICAÇÃO 3: se resto >= 2 que dois, dígito == 11-resto */
  if(resto >= 2 && (dv != 11 - resto)){
    return false;
  }
  return true;
};
function validateTO_9D(){
  let caracteres = ie.split('');
  var dv = caracteres[8];
  var remontagem = caracteres[0]+caracteres[1]+caracteres[2]+caracteres[3]+caracteres[4]+caracteres[5]+caracteres[6]+caracteres[7];
  var caracteresRemontagem = remontagem.split('');

  var i = 0;
  var soma = 0;
  for(var j = 9; j > 1; j--){
    soma += j * caracteresRemontagem[i];
    i++;
  }
  var resto = soma % 11;
  if(resto < 2){
    var dv_obtido = 0;
  }
  else{
    dv_obtido = 11 - resto;
  }
  /* VERIFICAÇÃO 1: */
  if(dv != dv_obtido){
    return false;
  }
  return true;
}
