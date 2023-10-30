// Ouverture de la modale 

import { getCategories, getWorks } from "./api.js"

export async function openModal () {
    // CREATION DE LA MODALE
    let modalBtn = document.querySelector(".modal-btn")
    modalBtn.classList.add("modal-trigger")
    let sectionIntroduction = document.getElementById("introduction")
    // place le container de la modale
    let modalContainer = document.createElement("div")
    modalContainer.classList.add("modal-container")
    sectionIntroduction.appendChild(modalContainer)
    // Place l'overlay de la modale
    let modalOverlay = document.createElement("div")
    modalOverlay.classList.add("overlay", "modal-trigger")
    modalContainer.appendChild(modalOverlay)
    // Place le contenu de la modale 
    let modal = document.createElement("div")
    modal.classList.add("modal")
    modalContainer.appendChild(modal)
    // Place le bouton de fermeture de la modale
    let closeModal = document.createElement("button")
    closeModal.classList.add("close-modal", "modal-trigger")
    closeModal.textContent = "×"
    modal.appendChild(closeModal)
    //CRÉATION DE LA DIV "GALLERIE PHOTO"
    // Placement d'une div active qui englobera la partie "Galerie photo"
    let divGallery = document.createElement("div"); 
    modal.appendChild(divGallery);
    divGallery.classList.add("active");
    // Placement du texte + style pour le texte  
    let titleModal = document.createElement("h3")
    titleModal.textContent = "Galerie photo"
    divGallery.appendChild(titleModal)
    // Création d'une div pour les images
    let smallWork = document.createElement("div"); 
    smallWork.classList.add("modalFigure")
    divGallery.appendChild(smallWork);
    // Affichage au clic 
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))
        
    function toggleModal() {
    modalContainer.classList.toggle("active")
    };
    // Ajout des photos des travaux
    // Récupération des travaux de l'API
    let works = await getWorks();
    for (const work of works) {
        // Création d'une div qui accueillera l'image et le bouton supprimer
        let smallFigure = document.createElement("div")
        smallFigure.classList.add("modalWork")
        smallWork.appendChild(smallFigure)
        // Création des différentes images
        let smallImg = document.createElement("img")
        smallImg.src = work.imageUrl; 
        // Attribution d'un ID pour augmenter sa spécificité
        smallImg.id = "modaleImage"; 
        smallFigure.appendChild(smallImg); 
        // Création du bouton "Supprimer"
        let deleteFigure = document.createElement("i");
        deleteFigure.setAttribute("class", "fa-solid fa-trash-can");
        smallFigure.appendChild(deleteFigure); 
    }
    // Ajout du bouton "Ajouter une photo"
    let addWorkBtn = document.createElement("button")
    divGallery.appendChild(addWorkBtn);
    addWorkBtn.textContent = "Ajouter une photo";
    addWorkBtn.classList.add("addWorkBtn");
    // CREATION DE LA DIV AJOUT PHOTO 
    let addWorkDiv = document.createElement("div");
    addWorkDiv.classList.add("displayNone");
    modal.appendChild(addWorkDiv);
    // Création de la flèche de retour en arrière
    let leftArrow = document.createElement("i");
    leftArrow.setAttribute("class", "fa-solid fa-arrow-left returnGallery");
    addWorkDiv.appendChild(leftArrow);
    // PLace le titre de la div
    let titleWork = document.createElement("h3");
    titleWork.textContent = "Ajout photo"; 
    addWorkDiv.appendChild(titleWork);
    // Place le formulaire de la div
    let addWorkForm = document.createElement("form"); 
    addWorkForm.setAttribute("method", "#");
    addWorkForm.classList.add("addWorkForm");
    addWorkDiv.appendChild(addWorkForm); 
    // Place l'ensemble de la div pour ajouter une image
    let addImageDiv = document.createElement("div");
    addImageDiv.classList.add("divAddImage")
    addWorkForm.appendChild(addImageDiv);
    let addImageIcon = document.createElement("i")
    addImageIcon.setAttribute("class", "fa-regular fa-image")
    addImageDiv.appendChild(addImageIcon)
    let addImageLabel = document.createElement("label")
    addImageLabel.setAttribute("class", "label-input-button")
    addImageLabel.textContent = "+ Ajouter photo"
    addImageDiv.appendChild(addImageLabel)
    let addImageInput = document.createElement("input");
    addImageInput.setAttribute("type", "file");
    addImageInput.setAttribute("name", "picture");
    addImageInput.classList.add("displayNone")
    addImageLabel.appendChild(addImageInput);
    let textAddImageDiv = document.createElement("p"); 
    textAddImageDiv.textContent = "jpg, png : 4mo max"
    addImageDiv.appendChild(textAddImageDiv); 
    // Place l'ensemble de la div pour ajouter un titre
    let labelAddTitle = document.createElement("label"); 
    labelAddTitle.setAttribute("for", "title");
    labelAddTitle.classList.add("formLabel")
    labelAddTitle.textContent = "Titre";
    addWorkForm.appendChild(labelAddTitle)
    let inputAddTitle = document.createElement("input")
    inputAddTitle.setAttribute("type", "text")
    inputAddTitle.setAttribute("id", "title")
    inputAddTitle.setAttribute("name", "title")
    addWorkForm.appendChild(inputAddTitle)
    // Place l'ensemble de la div pour séléctionner la catégorie
    let selectCategoryLabel = document.createElement("label");
    selectCategoryLabel.classList.add("formLabel"); 
    addWorkForm.appendChild(selectCategoryLabel); 
    selectCategoryLabel.textContent = "Catégorie";
    selectCategoryLabel.setAttribute("name", "category");
    let selectCategoryInput = document.createElement("select");
    addWorkForm.appendChild(selectCategoryInput);
    selectCategoryInput.setAttribute("name", "category");
    selectCategoryInput.setAttribute("id", "category");
    let categories = await getCategories(); 
    for (let category of categories) {
        let optionCategory = document.createElement("option");
        optionCategory.setAttribute("value", category.name);
        optionCategory.textContent = category.name;
        selectCategoryInput.appendChild(optionCategory)
    }
    //Place le bouton Submit
    let inputSubmitBtn = document.createElement("input")
    inputSubmitBtn.setAttribute("type", "submit")
    inputSubmitBtn.setAttribute("value", "Valider")
    addWorkForm.appendChild(inputSubmitBtn)

    // Disparition de la div "Gallerie photo" et apparition de la div "Ajout photo"
    addWorkBtn.addEventListener("click", ()=> {
        divGallery.classList.remove("active")
        divGallery.classList.add("displayNone")
        addWorkDiv.classList.add("active")

        // Fermeture de l'ajout de photo sans avoir ajouté de photo, retour sur la div "Gallerie Photo"
        leftArrow.addEventListener("click", () => {
            addWorkDiv.classList.remove("active");
            addWorkDiv.classList.add("displayNone")
            divGallery.classList.remove("displayNone")
            divGallery.classList.add("active")
        } )

    })


}

