var tab = ['bleu','vert','rouge','bleu','orange','bleu','bleu','vert','rouge','bleu','orange'];

// test rouge sans orange
// var tab = ['bleu','vert','rouge','bleu','bleu','bleu','vert','rouge','bleu'];

// test orange sans rouge
// var tab = ['bleu','vert','bleu','orange','bleu','bleu','vert','bleu','orange'];

// test sans le bleu
// var tab = ['vert','rouge','orange','vert','rouge','orange'];

/*function*/
function colorIsFound(tableau,color) {
  var trouve = false;
  for (var i = 0; i < tableau.length; i++) {
    if(tab[i] == color){
      trouve =  true;
    }
  }
  return trouve;
};



var text = "";
var showCouleur = "";
var i;
var cptBleu = 0;
var cptVert = 0;

for (i = 0; i < tab.length; i++) {

    switch (tab[i]) {
      case 'bleu':
              showCouleur += "<span id='blue'>a l'index " + i + " : " + tab[i] + "</span><br>";
              cptBleu++;
        break;
      case 'vert':
                showCouleur += "<span id='vert'>a l'index " + i + " : " + tab[i] + "</span><br>";
                cptVert++;
        break;
      case 'orange':
                showCouleur += "<span id='orange'>a l'index " + i + " : " + tab[i] + "</span><br>";
        break;
      case 'rouge':
                showCouleur += "<span id='rouge'>a l'index " + i + " : " + tab[i] + "</span><br>";
        break;
      default:
            showCouleur += "";
    }
    text = "il y a un nb occurence de bleu : " + cptBleu + " et il y a un nb occurence de vert : " + cptVert + "<br>";
}

var textCouleurFroide = "les couleurs froides sont ";
var textCouleurChaude = "les couleurs chaudes sont";
var textBleu = "";
var textVert = "";
var textRouge = "";
var textOrange = "";
var j;

var bleu = false;
var vert = false;
var rouge = false;
var orange = false;


for (j = 0; j < tab.length; j++) {
		if(tab[j]=='bleu' || tab[j]=='vert'){
      if(tab[j] =='bleu'){
        textBleu = " " + tab[j] + " ";
        bleu = true;
      }
      if(tab[j] =='vert'){
        textVert = " " + tab[j] + " ";
        vert = true;
      }
    }
}

// for (k = 0; k < tab.length; k++) {
// 		if(tab[k]=='rouge' || tab[k]=='orange'){
//       if(tab[k]=='rouge'){textCouleurChaude += "<span id='rouge'>a l'index " + k + " : " + tab[k] + "</span><br>";}
//       if(tab[k]=='orange'){textCouleurChaude += "<span id='orange'>a l'index " + k + " : " + tab[k] + "</span><br>";}
//     }
// }
// for (k = 0; k < tab.length; k++) {
// 		if(tab[k]=='rouge' || tab[k]=='orange'){
//       if(tab[k]=='rouge'){
//         textRouge = " " + tab[k] + " ";
//         rouge = true;
//       }
//       if(
//         tab[k]=='orange'){textOrange = " " + tab[k] + " ";
//         orange = true;
//       }
//     }
// }


//***trouvage de couleurs *******/
if (rouge && orange) {
    textCouleurChaude = "les couleurs chaudes ("+ textRouge + "et" + textOrange + ")";
}
else if (rouge && orange==false) {
  textCouleurChaude = "la couleur chaude ("+ textRouge + ")";
}
else if (rouge==false && orange) {
  textCouleurChaude = "la couleur chaude ("+ textOrange + ")";
}
else if(rouge==false && orange==false){
  textCouleurChaude = "il n y a pas de couleurs chaudes";
};

if (bleu && vert) {
    textCouleurFroide = "les couleurs froides sont ("+ textBleu + "et" + textVert + ")";
}
else if (bleu && vert==false) {
  textCouleurFroide = "la couleur froide ("+ textBleu + ")";
}
else if (bleu==false && vert) {
  textCouleurFroide = "la couleurs froide ("+ textVert + ")";
}
else if(bleu==false && vert==false){
  textCouleurFroide = "il n y a pas de couleurs froides";
}
else {
  textCouleurChaude = "erreur";
};


var ColorIsInTab;
ColorIsInTab = colorIsFound(tab,"bleu");



document.getElementById("show").innerHTML = showCouleur;
document.getElementById("demo").innerHTML = text;
document.getElementById("froid").innerHTML = textCouleurFroide;
document.getElementById("chaud").innerHTML = textCouleurChaude;


document.getElementById("colortrouve").innerHTML = ColorIsInTab;
