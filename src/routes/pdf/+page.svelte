<script>
    let signature = "";

    async function sendSignature() {
        if (!signature) {
            alert("Veuillez entrer une signature !");
            return;
        }

        try {
            // Envoie la signature au backend
            const response = await fetch('http://localhost:3000/api/sign-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ signature })
            });

            console.log("recupération réussie !")

            if (response.ok) {
                console.log("pdf modifié avec succès !")
                // Récupère le PDF modifié
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);

                // Déclenche le téléchargement
                const link = document.createElement('a');
                link.href = url;
                link.download = 'signed.pdf';
                link.click();
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.message}`);
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi de la signature :", err);
            alert("Erreur dans l'envoi");
        }
    }
</script>

<h1>Signature de PDF</h1>

<p>Entrez une signature, cliquez sur le bouton et téléchargez le PDF signé :</p>
<input type="text" placeholder="Signature" bind:value={signature}>
<button on:click={sendSignature}>Signer le PDF</button>
<p class="small">(Votre navigateur téléchargera le fichier modifié)</p>
