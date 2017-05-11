// enonce de l exercice : https://hastebin.com/jozalesoyu.pl
// juste pour tester si la page html et le script en js reagissent bien ensemble
// ca fonctionne
// function initialisation() {
//     alert("Page is loaded");
// }


// les variables
// tableau des pieces inserer
var coinsInserted = [];
//  tableau des pieces acceptes
var pieceAccepte = ['0.10','0.1','0.20','0.2','0.5','0.50','1.00','1.0','1','2.00','2.0','2'];
//nombre de goblets max
var nbGoblets = 1;

// montat des pieces mises dans la machine - erreur avec somme
var resteMonnaie;

var caffeSelectionne = null;
var caffePayeParClient = false;
var sucreSelectionne = null;
// prix a payer
var prixAPayer = null;



// Récupérer le champ texte contenant la valeur de l'afficheur
function coffeeAfficheur() {
        return document.coffee.afficheur;
}

function getCoin() {
        return document.getElementById("coinslot");
}

// Initialisation
function initialisation() {
  // coffeeAfficheur().value = "du cafe au lait";
}

//piece acceptes
function pieceValide(tab,piece) {
  for (var i = 0; i < tab.length; i++) {
    if(tab[i]==piece){
      return true;
    }
  }
  return false;
}

function addCoin(){

  var coin = getCoin().value;

  if(pieceValide(pieceAccepte,coin)){
    coinsInserted.push(parseFloat(coin));
    coffeeAfficheur().value = "piece accepte !";
    getCoin().value = null;
  }
  else {
    coffeeAfficheur().value = "piece non accepte !";
    getCoin().value = null;
  }

  //test
  console.log(sommePiece(coinsInserted));

}

// calcul la somme des pieces inserer dans la coinslot
function sommePiece(coinsInserted) {

  var montantTotal = 0;

  for (var i = 0; i < coinsInserted.length; i++) {
     montantTotal = montantTotal + coinsInserted[i];
  }
  //
  return parseFloat(montantTotal).toFixed(2);
}

function enoughMoneyInserted(prixDuCafe){

    var somme = sommePiece(coinsInserted);

    if(somme>=prixDuCafe){
      return true;
    }
    else{
      return false;
    }

}


// saisie du cafe
function saisie(cafe) {

  switch(cafe){
    case '1':

      prixAPayer = 1.00;

      if(enoughMoneyInserted(prixAPayer)){
        coffeeAfficheur().value = "voulez-vous du sucre avec votre café court ?";
        caffeSelectionne = "café court";
        caffePayeParClient = true;
      }
      else {
        coffeeAfficheur().value = "pas assez d'argent - inserer piece";
      }
      break;

    case '2':

      prixAPayer = 1.50;

      if(enoughMoneyInserted(prixAPayer)){
        coffeeAfficheur().value = "voulez-vous du sucre avec votre café au lait ?";
        caffeSelectionne = "café au lait";
        caffePayeParClient = true;
      }
      else {
        coffeeAfficheur().value = "pas assez d'argent - inserer piece";
      }

      break;

    case '3':

      prixAPayer = 1.20;

      if(enoughMoneyInserted(prixAPayer)){
        coffeeAfficheur().value = "voulez-vous du sucre avec votre café long ?";
        caffeSelectionne = "café au long";
        caffePayeParClient = true;
      }
      else {
        coffeeAfficheur().value = "pas assez d'argent - inserer piece";
      }

      break;

    default:
      coffeeAfficheur().value = "erreur";
      caffeSelectionne = "erreur";
  }
}

// saisie du sucre ou du cancel
function sucre(val) {

    switch (val) {
      case 'oui':
        if(caffePayeParClient && nbGoblets>0){
          sucreSelectionne = true;
          caffeSelectionne += " avec sucre";
          // somme - prix du cafe
          resteMonnaie = sommePiece(coinsInserted) - prixAPayer;
          resteMonnaie = resteMonnaie.toFixed(2);
          // on vide le porte monaie
          coinsInserted = [];
          // on decremente goblets
          nbGoblets--;
          setTimeout(function(){ coffeeAfficheur().value = "préparation en cours"; }, 1000);
          setTimeout(function(){ coffeeAfficheur().value = "veuillez prendre votre boisson : " + caffeSelectionne; }, 3000);
          // faire le rendu monnaie si il y en a un.
          if(resteMonnaie!=0){
            setTimeout(function(){ coffeeAfficheur().value = "rendu monaie  : " + resteMonnaie; }, 5000);
          }
          setTimeout(function(){ coffeeAfficheur().value = "" ; }, 7000);
        }
        else if(nbGoblets==0){
          coffeeAfficheur().value = "Machine Hors service";
        }
        else{
          coffeeAfficheur().value = "selectionne votre cafe d'abord";
        }
        break;

      case 'non':
        if(caffePayeParClient){
          sucreSelectionne = true;
          caffeSelectionne += " sans sucre";
          // somme - prix du cafe
          resteMonnaie = sommePiece(coinsInserted) - prixAPayer;
          resteMonnaie = resteMonnaie.toFixed(2);
          // on vide le porte monaie
          coinsInserted = [];
          // on decremente goblets
          nbGoblets--;
          setTimeout(function(){ coffeeAfficheur().value = "préparation en cours"; }, 1000);
          setTimeout(function(){ coffeeAfficheur().value = "veuillez prendre votre boisson : "+caffeSelectionne; }, 4000);
          // faire le rendu monnaie si il y en a un.
          if(resteMonnaie!=0){
            setTimeout(function(){ coffeeAfficheur().value = "rendu monaie  : " + resteMonnaie; }, 5000);
          }
          setTimeout(function(){ coffeeAfficheur().value = ""; }, 7000);
        }
        else{
          coffeeAfficheur().value = "selectionne votre cafe d'abord";
        }
        break;

      case 'cancel':
        // methode qui annule tout et rend la monaie
        sucreSelectionne = 'cancel';
        resteMonnaie = sommePiece(coinsInserted);
        // vide la coinslot
        coinsInserted = [];
        setTimeout(function(){ coffeeAfficheur().value = "Annulation commande"; }, 1000);
        setTimeout(function(){ coffeeAfficheur().value = "rendu monaie  : " + resteMonnaie; }, 2000);
        setTimeout(function(){ coffeeAfficheur().value = ""; }, 5000);
        //test
        console.log(sommePiece(coinsInserted));

        break;
      default:
        sucreSelectionne = 'erreur';
    }
}
