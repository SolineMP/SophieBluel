import { getCategories, getWorks } from "./api.js";
import { openModal } from "./modals.js";

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
premierBtn.dataset.id = 0;
premierBtn.classList.add("filterBtn", "filterBtn_selected");


// Récupération des catégories depuis l'API 
export async function getDisplayOfCategories() {
    const categories = await getCategories();
    for (const category of categories) {
        // Création des boutons 
        let filtreBtn = document.createElement("button");
        filtreBtn.innerText = category.name;
        filtreBtn.dataset.id = category.id
        filtreBtn.classList.add("filterBtn");
        // Création des emplacement dans le DOM 
        filterDiv.appendChild(filtreBtn);
        }
    }

// Affichage des travaux
export async function getDisplayOfWorks() {  
    // Récupération des travaux depuis l'API
    let displayWorks = await getWorks();
    for (const displayWork of displayWorks) {
        // Récupération de l'élément du DOM qui accueillera les travaux 
        const sectionGallery = document.querySelector(".gallery");
        // Création d'une balise qui accueillera les éléments des travaux 
        const pieceElement = document.createElement("figure"); 
        pieceElement.dataset.id = displayWork.categoryId
        // Création des différents élements contenus dans la balise figure
        const imgElement = document.createElement("img");
        imgElement.src = displayWork.imageUrl;
        imgElement.setAttribute("alt", "Photo représentant le travail de Sophie Bluel");
        const nomElement = document.createElement("figurecaption");
        nomElement.innerText = displayWork.title ;
        // Création des emplacements sur le DOM
        sectionGallery.appendChild(pieceElement); 
        pieceElement.appendChild(imgElement);
        pieceElement.appendChild(nomElement);
    }
} 
// Page lorsque l'utilisateur est connecté
export function displayIfConnectedUser() {
    // Deconnexion de l'utilisateur 
    let btnDeco = document.getElementById("decoBtn");
    btnDeco.textContent = "logout"
    btnDeco.addEventListener("click", () => {
        let deconnexion = window.localStorage.removeItem("token")
    })
    // Bande noire sur le haut de page
    let blackDiv = document.createElement("div")
    blackDiv.classList.add("blackDiv")
    let body = document.querySelector("body")
    let header = document.querySelector("header")
    body.appendChild(blackDiv)
    body.insertBefore(blackDiv, header)
    // Texte dans la bande noire 
    let iconMode = document.createElement("i")
    iconMode.setAttribute("class", "fa-regular fa-pen-to-square")
    blackDiv.appendChild(iconMode)
    let textMode = document.createElement("p")
    textMode.textContent ="Mode édition"
    blackDiv.appendChild(textMode)
    // Disparition du bouton "Tous"
    premierBtn.classList.add("displayNone");
    // Création d'une div pour le bouton "Modifier"
    let updateBtn = document.createElement("button");
    updateBtn.classList.add("modal-btn", "modal-trigger")
    updateBtn.textContent = "modifier"
    sectionPortfolio.appendChild(updateBtn);
    sectionPortfolio.insertBefore(updateBtn, filterDiv)
    // Ajout de l'icone
    let iconUpdate = document.createElement("i")
    iconUpdate.setAttribute("class", "fa-regular fa-pen-to-square")
    updateBtn.appendChild(iconUpdate)

    // Affichage des éléments 
    getDisplayOfWorks();

    // Ouverture de la modale 
    openModal(); 
}
//Boutons filtre
window.onload = () => {
    let filterBtns = document.querySelectorAll(".filterBtn")
    const travaux = document.querySelector(".gallery")
    let figures = travaux.querySelectorAll("figure")
    for (let element of filterBtns) {
        element.addEventListener("click", () => {
            for (let figure of figures){
                if (element.dataset.id == 0) {
                    figure.classList.remove("displayNone")
                } else {
                    let isDifferentDataSetId = (figure.dataset.id !== element.dataset.id)
                    figure.classList.toggle("displayNone", isDifferentDataSetId)
                }
            }
        })
    }
}



