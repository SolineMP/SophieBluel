
const link = "http://localhost:5678/api/users/login"

let baliseEmail = document.getElementById("email"); 
let balisePassword = document.getElementById("password");

// Création de l'événement submit pour se connecter
const loginForm = document.querySelector("form"); 
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    // Regroupement des infos dans un objet
    const userInfo = { email : baliseEmail.value, password : balisePassword.value };
        try {
            const response = await fetch( link , {
                method: 'POST',
                headers: {
                     'accept': 'application/json',
                    'Content-Type' : 'application/json'
                } ,
                body : JSON.stringify(userInfo)
            });
            const data = await response.json()
            if (response.ok === true) {
                    alert("vous êtes connectés")
                    window.localStorage.setItem("token", data.token);
                    goToMainPage();
            } else if (data.message === "user not found") {
                    alert("Veuillez réécrire votre email"); 
            } else if (data.error !== null) {
                    alert("Veuillez réécrire votre mot de passe")
            }
        } catch {
                // Vérification des input
                if (baliseEmail.value === "") {
                    alert("le champ nom est vide")
                } else if (balisePassword.value === "") {
                    alert("le champ mot de passe est vide")
                }
                verifierEmail(baliseEmail); 
        }    
    });


function verifierEmail(balise) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (emailRegExp.test(balise.value)) {
        console.log("Il y a une erreur dans l'écriture de la balise")
    }
    return emailRegExp
}

function goToMainPage() {
    window.location.href="../../index.html"
}

