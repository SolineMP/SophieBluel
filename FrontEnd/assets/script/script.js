import { getDisplayOfWorks, getDisplayOfCategories, displayIfConnectedUser } from "./display.js";

// Affichager de la page selon état de la page
let tokenUp = window.localStorage.getItem("token")
if (tokenUp === null ) {
    getDisplayOfCategories();
    getDisplayOfWorks()
} else {
    displayIfConnectedUser()
}

// getWorkByCategory();
