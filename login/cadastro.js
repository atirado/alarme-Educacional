async function login() {
    const nome = document.getElementById('nome').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    const data = { nome, usuario, senha };

    const response = await fetch('http://localhost:3008/api/store/user', {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if(result.success) {
        alert(result.message);
    } else {
        alert("conta criada");
    }
}
