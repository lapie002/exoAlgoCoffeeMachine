// juste pour tester si la page html et le script en js reagissent bien ensemble
/*
function initialisation() {
    alert("Page is loaded");
}
*/

// Opérande gauche utilisé dans les calculs
var operande_gauche ;
// Opération à effectuer
var operateur ;


// Récupérer le champ texte contenant la valeur de l'afficheur
function afficheur() {
        return document.calculatrice.afficheur ;
}

/// Initialisation de la calculatrice
function initialisation() {
  operande_gauche = null ;
  operateur = null ;
  afficheur().value = null;
}

// Effacement du dernier caractère
function effacer() {
  afficheur().value = afficheur().value.replace(/.$/,'') ;
}

// Action à réaliser lorsqu'une saisie est effectuée
function saisie(touche) {
  switch (touche) {

    case '+-':
      signe();
      break;

    case 'eff':
      effacer();
      break;

    case '.':
        if(/\./.test(afficheur().value)) { return ; }

    default:
        afficheur().value = afficheur().value + touche ;
  }
}

// Action à effectuer lorsqu'une opération est saisie
function operation(touche) {
  switch (touche) {
    case '+':
    case '-':
    case '*':
    case '/':
        if(operateur!=null && operande_gauche!=null){ resultat() ; }
        operateur = touche ;
        operande_gauche = parseFloat(afficheur().value) ;
        afficheur().value = '';
      break;

    case '=':
      resultat() ;
      break;

    case '%':
      pourcent() ;
      break;

    default:
      erreur("Erreur il y a eu un probleme lors de l'execution") ;
  }
}

// Calculer et afficher le résultat du calcul si celui-ci peut être réalisé
function resultat() {
  if (operande_gauche == null) {
    erreur("Premier operande inconnu") ;
    return ;
  }
  if (afficheur().value == '') {
    erreur("Second operande inconnu") ;
    return ;
  }

  var operande_droite = parseFloat(afficheur().value) ;
  var res = null ;

  switch (operateur) {
    case '+':
      res = operande_gauche + operande_droite ;
      break;

    case '-':
      res = operande_gauche - operande_droite ;
      break;

    case '*':
      res = operande_gauche * operande_droite ;
      break;

    case '/':
      res = operande_gauche / operande_droite ;
      break;

    default:
      erreur("Pas d'operation a realiser");
      return ;
  }

  afficheur().value = res ;
  operande_gauche = null ;
  operande_droite = null ;

}

// signe Opposé
function signe() {
  if(/^-/.test(afficheur().value)) {
    afficheur().value = afficheur().value.replace(/^-/,'');
  }
  else{
    afficheur().value = afficheur().value.replace(/^/,'-');
  }
}

// Calcul de pourcentage
function pourcent() {
  if(operande_gauche == null){
    erreur("Pas d'operande gauche") ;
  }
  else{
    afficheur().value = operande_gauche * parseFloat(afficheur().value) / 100 ;
  }
}

// Message d'erreur
function erreur(msg) {
    window.alert(msg) ;
}
