const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const routes = require('./routes');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', routes);

const server = app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Novo cliente conectado');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('Mensagem recebida:', data);

            if (data.type === 'pergunta') {
                // Resposta do bot para chat.html
                const resposta = gerarResposta(data.mensagem);
                const respostaData = {
                    type: 'resposta',
                    message: resposta
                };
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(respostaData));
                    }
                });
            } else if (data.type === 'mensagem') {
                // Chat em tempo real para conversar-admin.html
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(data));
                    }
                });
            }
        } catch (error) {
            console.error('Erro ao processar mensagem:', error);
            ws.send(JSON.stringify({
                type: 'erro',
                message: 'Erro ao processar a mensagem'
            }));
        }
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });

    ws.on('error', (error) => {
        console.error('Erro no WebSocket:', error);
    });
});

// Função para gerar respostas automáticas do bot (usada apenas em chat.html)
function gerarResposta(pergunta) {
    const perguntaLower = pergunta.toLowerCase().trim();
    
    if (perguntaLower.includes('prevenir') || perguntaLower.includes('prevenção')) {
        return 'Para prevenir lesões, realize aquecimentos adequados, use equipamentos de proteção e mantenha uma dieta equilibrada.';
    } else if (perguntaLower.includes('recuperar') || perguntaLower.includes('recuperação')) {
        return 'Para recuperação, siga as orientações médicas, faça fisioterapia e retorne gradualmente às atividades.';
    } else if (perguntaLower.includes('entorse')) {
        return 'Entorses podem ser tratadas com repouso, gelo, compressão e elevação (método RICE). Consulte um médico para avaliação.';
    } else {
        return 'Desculpe, não entendi sua pergunta. Tente ser mais específico ou pergunte sobre prevenção, recuperação ou tipos de lesões.';
    }
}

module.exports = app;