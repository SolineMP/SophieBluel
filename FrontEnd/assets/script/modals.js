// Ouverture de la modale 

export function openModal () {
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
    closeModal.textContent = "X"
    modal.appendChild(closeModal)
    let titleModal = document.createElement("h1")
    titleModal.textContent = "Test"
    modal.appendChild(titleModal)
    // Affichage au clic 
        const modalTriggers = document.querySelectorAll('.modal-trigger');
        modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))
        
        function toggleModal() {
            modalContainer.classList.toggle("active")
        };
    
}