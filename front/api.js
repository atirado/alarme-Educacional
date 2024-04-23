let button = document.getElementById("handleSubmit");
 
button.onclick= async function() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let data = {email, senha}
 
    const response = await fetch('http://localhost:3008/api/store/post', {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(data)
});
 
    let content = await response.json();
 
    if(content.sucess){
        alert("Sucesso")
    }else{
        alert("Não")
    }
}