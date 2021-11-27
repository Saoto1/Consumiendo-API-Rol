document.onload = estaAutenticado();

function estaAutenticado(){
    if(localStorage.getItem("token") != null){
        console.log("autenticado");
    }else{
        document.location.href="/HTML/Login.html";
    }
}
const toggleButton  = document.getElementById('toggle-button');
const navilist = document.getElementById('navi-list');

const cerrarSesionButton = document.getElementById('cerrarSesion-button');

toggleButton.addEventListener('click', ()=>{
    navilist.classList.toggle('active');
});

cerrarSesionButton.addEventListener('click',()=>{
    localStorage.removeItem('token');
    document.location.href="/HTML/Login.html";
});