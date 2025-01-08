document.getElementById('downloadButton').addEventListener('click', function() {
    const url = document.getElementById('url').value;
    const destination = document.getElementById('destination').value;

    //  campos não podem estar vazios
    if (!url) {
        alert('Por favor, insira a URL do vídeo.');
        return;
    }

    if (!destination) {
        alert('Por favor, insira uma pasta de destino.');
        return;
    }

    // Enviar os dados para o servidor para iniciar o download
    fetch('http://localhost:3000/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, destination })
    })
    .then(response => response.json())
    .then(data => {
        // Mensagem de sucesso ou erro
        if (data.message) {
            alert(data.message);
        } else if (data.error) {
            alert('Erro: ' + data.error);
        }
    })
    .catch(error => {
        alert('Erro ao iniciar o download: ' + error.message);
    });
});
