// Seleciona o botão de envio pelo ID
let button = document.getElementById("submitDevice");

// Adiciona um evento de clique ao botão
button.onclick = async function() {
    
    let nome_dos_dispositivos = document.getElementById("deviceName").value;
  
    let data = { nome_dos_dispositivos };

    try {
        // Faz uma requisição POST para a API com o URL especificado
        const response = await fetch('http://localhost:3008/api/store/post', {
            method: "POST", 
            headers: {
                "Content-type": "application/json; charset=UTF-8" 
            },
            body: JSON.stringify(data) 
        });

        // Espera a resposta da requisição e a converte para JSON
        let content = await response.json();

        
        if (content.sucess) {
            
            alert("Sucesso");
        } else {
          
            alert("Enviado");
        }
    } catch (error) {
       
        console.error('Erro na requisição:', error);
        alert("enviado");
    }
}
