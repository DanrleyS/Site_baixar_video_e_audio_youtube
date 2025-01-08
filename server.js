const express = require('express');
const { exec } = require('child_process'); 
const path = require('path');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors()); 

// Rota para download
app.post('/download', (req, res) => {
    const { url, destination } = req.body;

    // Verifica se URL e pasta de destino foram fornecidas
    if (!url || !destination) {
        return res.status(400).json({ error: 'URL e pasta de destino são necessários' });
    }

    // Garantir que a pasta de destino existe
    const destinationPath = path.join(destination, '%(title)s.%(ext)s');
    
    // Comando para rodar o yt-dlp no terminal
    const command = `yt-dlp -o "${destinationPath}" ${url}`;

    console.log(`Comando gerado: ${command}`);

    // Executa o comando
    exec(command, (error, stdout, stderr) => {
        if (error) {
         
            console.error(`Erro ao executar o yt-dlp: ${stderr}`);
            return res.status(500).json({ error: 'Erro ao baixar o vídeo', details: stderr });
        }
        
        console.log(`Output do yt-dlp: ${stdout}`);
        res.json({ message: 'Download iniciado com sucesso!' });
    });
});

//ervidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
