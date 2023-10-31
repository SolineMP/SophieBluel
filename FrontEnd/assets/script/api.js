//Ficher d'appels à l'API

// Création d'une variable pour appeler l'API
const link = "http://localhost:5678/api/"

export async function getWorks () {
    try {
        const works = await fetch(link + "works").then(works => works.json());
        return works
    } catch {
        console.log("il y a une erreur dans l'appel à l'API")
    }
}

export async function getCategories(){
    try {
        const categories = await fetch(link + "categories").then(categories => categories.json()); 
        return categories
    } catch {
        console.log("Il y a une erreur dans l'appel à l'API")
    }
}

