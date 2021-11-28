document.onload = estaAutenticado();

function estaAutenticado(){
    if(localStorage.getItem("token") != null){
        console.log("autenticado");
    }else{
        document.location.href="/HTML/Login.html";
    }
}

const cerrarSesionButton = document.getElementById('cerrarSesion-button');


cerrarSesionButton.addEventListener('click',()=>{
    localStorage.removeItem('token');
    document.location.href="/HTML/Login.html";
});