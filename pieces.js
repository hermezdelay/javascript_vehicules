// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();


for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // Création des balises 
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
    
    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    //Ajout des éléments au DOM pour l'exercice
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

 }

// pour trier les articles selon leurs prix
 const boutonTrier = document.querySelector(".btn-trier");
 boutonTrier.addEventListener("click", function () {
    const piecesOrdonnee = Array.from(pieces);
    piecesOrdonnee.sort(function (a, b) {
         return a.prix - b.prix;
     });
     console.log(piecesOrdonnee);
 });

 // pour appliquer un filtre sur les articles
 const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    // ...
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    
    console.log(piecesFiltrees);
});

//pour appliquer un filtre des produits qui ont seulement une description
const bouttonFiltreDescription = document.querySelector(".btn-filtrer-description");
bouttonFiltreDescription.addEventListener("click", function(){
    const piecesFilter = pieces.filter(function(piece){
        if( piece.description){
            alert(piece.description)
            return piece.description
        } 
    });
    console.log(piecesFilter)
})

// pour trier les articles selon leurs prix dans un ordre décroissant
const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
boutonTrierDecroissant.addEventListener("click", function () {
   const piecesOrdonnee = Array.from(pieces);
   piecesOrdonnee.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnee);
});


 // pour afficher la liste des produits dont on a besoin
 const afficher = document.querySelector(".afficher");
 //
    // ...
const piecesFiltrees = pieces.map(piece => piece.nom);
const piecesFiltreesprix = pieces.map(piece => piece.prix);

for(let i = pieces.length -1 ; i>= 0; i--){
    if( pieces[i].disponibilite === false) {
        piecesFiltrees.splice(i,1);
        piecesFiltreesprix.splice(i,1);
    }
}
const baliseul = document.createElement("ul");

for (let index = 0; index < piecesFiltrees.length; index++) {
    const article = pieces[index];
    const element = document.createElement("li");
    element.innerText = piecesFiltrees[index]+ `- ${piecesFiltreesprix[index]} $`;

    baliseul.appendChild(element)
    
}

afficher.appendChild(baliseul)