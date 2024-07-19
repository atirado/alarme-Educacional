let button = document.getElementById("submitDevice");
 
button.onclick= async function() {
    let nome_dos_dispositivos = document.getElementById("deviceName").value;
    let data = {nome_dos_dispositivos}
 
    const response = await fetch('http://localhost:3008/api/store/post', {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(data)
});
 
    let content = await response.json();
 
    if(content.sucess){
        alert("Sucesso")
    }else{
        alert("enviado")
    }
}