let connectedDevice = null; // Variável global para armazenar o dispositivo Bluetooth conectado
let connectedServer = null; // Variável global para armazenar o servidor GATT conectado
let timerInterval = null; // Variável global para armazenar o intervalo do temporizador
let startTime = null; // Variável global para armazenar o tempo de início do monitoramento
let usageTimeChart = null; // Variável para armazenar o gráfico de tempo de uso

// Função para iniciar o temporizador de monitoramento do uso do dispositivo
function startTimer() {
    const model = document.getElementById('selectedModel').innerText; // Obtém o modelo do dispositivo selecionado
    if (!model) {
        alert("Por favor, selecione um smartphone antes de iniciar o monitoramento."); // Alerta se nenhum dispositivo foi selecionado
        return;
    }

    startTime = new Date(); // Armazena o horário de início do monitoramento
    if (timerInterval) {
        clearInterval(timerInterval); // Limpa qualquer intervalo anterior
    }

    timerInterval = setInterval(updateUsageTime, 1000); // Inicia o intervalo que atualiza o tempo de uso a cada segundo
}

// Função para parar o temporizador de monitoramento do uso do dispositivo
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval); // Limpa o intervalo
        timerInterval = null;
        document.getElementById('usageTimeDisplay').textContent = ""; // Limpa a exibição do tempo de uso
        document.getElementById('connectedDeviceDisplay').textContent = ""; // Limpa a exibição do dispositivo conectado
        alert("Monitoramento do dispositivo " + document.getElementById('selectedModel').innerText + " parado."); // Alerta que o monitoramento foi parado
    }
}

// Função que atualiza a exibição do tempo de uso do dispositivo
function updateUsageTime() {
    const usageTimeDisplay = document.getElementById('usageTimeDisplay'); // Obtém o elemento de exibição do tempo de uso
    const currentTime = new Date(); // Obtém o horário atual
    const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calcula o tempo decorrido em segundos

    const hours = Math.floor(elapsedTime / 3600); // Calcula o número de horas
    const minutes = Math.floor((elapsedTime % 3600) / 60); // Calcula o número de minutos
    const seconds = elapsedTime % 60; // Calcula o número de segundos
    const formattedTime = `${hours} hora${hours !== 1 ? 's' : ''}, ${minutes} minuto${minutes !== 1 ? 's' : ''} e ${seconds} segundo${seconds !== 1 ? 's' : ''}`;

    usageTimeDisplay.textContent = `Tempo de uso do dispositivo ${document.getElementById('selectedModel').innerText}: ${formattedTime}`; // Atualiza a exibição do tempo de uso

    updateChart(hours, minutes, seconds); // Atualiza o gráfico com o tempo de uso

    if (elapsedTime >= 60) { // Verifica se o tempo de uso é igual ou superior a 1 minuto (60 segundos)
        const alarmSound = document.getElementById('alarmSound'); // Obtém o elemento de som do alarme
        alarmSound.play(); // Toca o alarme

        // Para o alarme após 10 segundos
        setTimeout(() => {
            alarmSound.pause(); // Pausa o alarme
            alarmSound.currentTime = 0; // Reseta o som do alarme para o início
        }, 10000); // 10000 milissegundos = 10 segundos
    }
}

// Função para atualizar o gráfico de tempo de uso
function updateChart(hours, minutes, seconds) {
    const ctx = document.getElementById('usageTimeChart').getContext('2d'); // Obtém o contexto do canvas do gráfico

    if (!usageTimeChart) {
        usageTimeChart = new Chart(ctx, {
            type: 'bar', // Define o tipo do gráfico como barra
            data: {
                labels: ['Horas', 'Minutos', 'Segundos'], // Define os rótulos do eixo X
                datasets: [{
                    label: 'Tempo de Uso', // Define o rótulo do conjunto de dados
                    data: [hours, minutes, seconds], // Define os dados do conjunto de dados
                    backgroundColor: getBackgroundColor(hours), // Define a cor do gráfico com base nas horas
                    borderColor: 'rgba(0, 0, 0, 1)', // Define a cor da borda das barras
                    borderWidth: 1 // Define a largura da borda das barras
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true // Define que o eixo Y deve começar do zero
                    }
                }
            }
        });
    } else {
        usageTimeChart.data.datasets[0].data = [hours, minutes, seconds];
        usageTimeChart.data.datasets[0].backgroundColor = getBackgroundColor(minutes); 
        usageTimeChart.update(); // Atualiza o gráfico
    }
}

// Função para obter a cor de fundo do gráfico com base nas horas de uso
function getBackgroundColor(minutes) {
    if (minutes >= 1) {
        return 'rgba(255, 0, 0, 0.6)'; // Retorna vermelho se as horas de uso são 5 ou mais
    } else if (minutes >= 30 ) {
        return 'rgba(255, 165, 0, 0.6)'; // Retorna laranja se as horas de uso são entre 3 e 5
    } else {
        return 'rgba(0, 255, 0, 0.6)'; // Retorna verde se as horas de uso são menos de 3
    }
}

// Função para exibir o modal de dispositivos disponíveis
function showModal() {
    const modal = document.getElementById("myModal"); // Obtém o elemento modal
    modal.style.display = "block"; 
    scanForDevices(); // Inicia a busca por dispositivos Bluetooth disponíveis
}

// Função para fechar o modal de dispositivos disponíveis
function closeModal() {
    const modal = document.getElementById("myModal"); // Obtém o elemento modal
    modal.style.display = "none"; // Oculta o modal
}

// Função para conectar ao smartphone selecionado
async function connectSmartphone(device, model) {
    try {
        console.log("Conectando ao dispositivo:", device); // Log para depuração
        const server = await device.gatt.connect(); // Conecta ao servidor GATT do dispositivo selecionado
        connectedDevice = device; // Armazena o dispositivo conectado na variável global
        connectedServer = server; // Armazena o servidor GATT conectado na variável global
        document.getElementById('selectedModel').innerText = model; // Atualiza a interface com o modelo do dispositivo conectado
        document.getElementById('connectedDeviceDisplay').textContent = `Aparelho conectado: ${model}`; // Exibe uma mensagem na interface indicando o dispositivo conectado
        alert("Conectado ao dispositivo: " + model); // Exibe um alerta de sucesso na conexão
    } catch (error) {
        console.error("Erro ao conectar ao dispositivo:", error); // Loga o erro no console
        alert("Erro ao conectar ao dispositivo: " + error.message); // Exibe um alerta com a mensagem de erro
    }
}

// Função para escanear dispositivos Bluetooth disponíveis
async function scanForDevices() {
    if (!navigator.bluetooth) {
        alert("Seu navegador não suporta Web Bluetooth.");
        return;
    }

    try {
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true, // Aceita todos os dispositivos
            optionalServices: ['generic_access', 'battery_service'] // Inclui serviços adicionais para tentar obter mais informações do dispositivo
        });

        const deviceList = document.getElementById('deviceList'); // Obtém o elemento da lista de dispositivos
        deviceList.innerHTML = ''; // Limpa a lista antes de adicionar novos dispositivos

        let deviceName = device.name || device.gatt.device.name; // Tenta obter o nome do dispositivo diretamente

        if (!deviceName) { // Se o nome não estiver disponível diretamente
            try {
                const server = await device.gatt.connect(); // Conecta ao servidor GATT
                const service = await server.getPrimaryService('generic_access'); // Obtém o serviço genérico de acesso
                const characteristic = await service.getCharacteristic('gap.device_name'); // Obtém a característica do nome do dispositivo
                const value = await characteristic.readValue(); // Lê o valor da característica
                deviceName = new TextDecoder().decode(value); // Decodifica o valor lido para obter o nome do dispositivo
                await server.disconnect(); // Desconecta do servidor GATT
            } catch (error) {
                console.error("Erro ao obter o nome do dispositivo:", error); // Loga o erro no console
            }
        }

        // Atualizando para garantir que só caia no fallback se não houver realmente um nome disponível
        if (!deviceName) {
            deviceName = 'Dispositivo Desconhecido';
        }

        const listItem = document.createElement('li'); // Cria um novo item de lista
        listItem.textContent = deviceName; // Define o texto do item como o nome do dispositivo
        listItem.onclick = () => connectSmartphone(device, deviceName); // Define a ação de clique para conectar ao dispositivo

        deviceList.appendChild(listItem); // Adiciona o item à lista de dispositivos

    } catch (error) {
        console.error("Erro ao escanear dispositivos:", error); // Loga o erro no console
        alert("Erro ao escanear dispositivos: " + error.message); // Exibe um alerta com a mensagem de erro
    }
}

// Adiciona um ouvinte de evento ao clique no botão de fechar o modal
document.getElementsByClassName("close")[0].onclick = closeModal;