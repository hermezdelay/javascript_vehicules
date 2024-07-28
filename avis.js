
export function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {
      piecesElements[i].addEventListener("click", async function (event) {
        const id = event.target.dataset.id;
        const reponse= await fetch(`http://localhost:8081/pieces/${id}/avis`);
        const avis= (await reponse.json() );

        const pieceElement = event.target.parentElement;

        const avisElement = document.createElement("p");
        for (let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;
        pieceElement.appendChild(avisElement);
        }

        /*
        for (let i = 0; i < avis.length; i++) {
            console.log(`${avis[i].utilisateur}: ${avis[i].commentaire}`);
            
            //console.log(
           // alert(`${avis[i].utilisateur}: ${avis[i].commentaire} `)
         }
           /* ... */
      });
    }
};

export function ajoutListenerEnvoyerAvis(){
    const ListenerEnvoyerAvis = document.querySelector(".formulaire-avis");
    ListenerEnvoyerAvis.addEventListener("submit", async function(event){
            
        // On empêche le comportement par défaut
        event.preventDefault();
        alert("coucou = " + event.target.querySelector("[name=piece-id]").value);
        const avis = {
            pieceId : parseInt(event.target.querySelector("[name=piece-id]").value),
            utilisateur: event.target.querySelector("[name=utilisateur]").value,
            commentaire: event.target.querySelector("[name=commentaire]").value            
        };
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(avis);
        
        fetch(`http://localhost:8081/avis`,{
              /* Objet de configuration */
            method: "POST",
            header : { "Content-Type": "application/json" },
            body : chargeUtile

        });


    });







}