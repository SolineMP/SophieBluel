// Création d'une variable pour appeler l'API
const link = "http://localhost:5678/api/"
// Création du premier bouton filtre
const premierBtn = document.createElement("button");
// Création de l'élément du DOM qui accueillera les balises button
let filterDiv = document.createElement("div");
// Récupération de l'élément du DOM qui accueillera la div filtre
const sectionPortfolio = document.getElementById("portfolio");
const sectionGallery = document.querySelector(".gallery");
// Élements rattachés à leurs balises 
sectionPortfolio.appendChild(filterDiv);
sectionPortfolio.insertBefore(filterDiv, sectionGallery);
filterDiv.appendChild(premierBtn);
// Élements stylistique des boutons
filterDiv.classList.add("filterDiv")
premierBtn.innerText = "Tous";
premierBtn.classList.add("filterBtn", "filterBtn_selected");

// Récupération des catégories depuis l'API 
export async function getCategories() {
    const categories = await fetch(link + "categories").then(categories => categories.json()); 
    for (let j = 0; j < categories.length; j++) {
        const filtreArray = categories[j];
        // Création des boutons 
        const filtreBtn = document.createElement("button");
        filtreBtn.innerText = filtreArray.name;
        filtreBtn.classList.add("filterBtn");
        // Création des emplacement dans le DOM 
        filterDiv.appendChild(filtreBtn);

        // Classement par filtres 
        console.log(filtreArray)
        console.log(categories[j].id)
        filtreBtn.addEventListener("click", () => {
            filtreBtn.classList.add("filterBtn_selected")
            const travailFiltre = categories.filter(filtreArray => String(filtreArray.id));
            console.log(travailFiltre)
        })
    }
}


// Si je clique sur le bouton filtre Tous 
// Le bouton prend la classe selected
// Tous les travaux s'affichent 
// si je clique sur un autre bouton
// L'autre bouton perd la classe selected  
// Il prend la classe selected
// il s'affiche seulement les travaux liés à la catégorie choisie

// Affichage des travaux
export async function getWorks() {  
    // Récupération des travaux depuis l'API
    const works = await fetch(link + "works").then(works => works.json());
    for (let i = 0; i < works.length; i++) {
        const figure = works[i];
        // Récupération de l'élément du DOM qui accueillera les travaux 
        const sectionGallery = document.querySelector(".gallery");
        // Création d'une balise qui accueillera les éléments des travaux 
        const pieceElement = document.createElement("figure"); 
        // Création des différents élements contenus dans la balise figure
        const imgElement = document.createElement("img");
        imgElement.src = figure.imageUrl;
        imgElement.setAttribute("alt", "Photo représentant le travail de Sophie Bluel");
        const nomElement = document.createElement("figurecaption");
        nomElement.innerText = figure.title ;
        // Création des emplacements sur le DOM
        sectionGallery.appendChild(pieceElement); 
        pieceElement.appendChild(imgElement);
        pieceElement.appendChild(nomElement);
    }
} 

