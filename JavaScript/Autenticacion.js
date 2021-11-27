document.onload = estaAutenticado();

function estaAutenticado(){
    if(localStorage.getItem("token") != null){
        document.location.href="/HTML/Index.html";
    }else{
        console.log("no autenticado");
    }
}

const formularioLogin = document.querySelector('#formulario-login');

localStorage.setItem("urlApi","https://SalonBellezaWebApi.somee.com/api/");
url = localStorage.getItem("urlApi");

formularioLogin.addEventListener('submit', (e)=>{//capturamos el evento
    e.preventDefault();//cancela el evento por defecto

    const usuario = document.querySelector('#login').value; //Creacmos una constante el cual obtendra el valor de la caja de texto Usuario
    const password = document.querySelector('#password').value; //Creacmos una constante el cual obtendra el valor de la caja de texto Password
    
    auth(usuario,password)//mandamos a llamar al metodo
})

function auth(usuario, password){//funcion para loggearse
    const Usuario = { //objeto que se mandara en el body de la peticion
        login: usuario,
        password: password
    }

    fetch(this.url + "Usuario/login",{
        method:'POST',
        body: JSON.stringify(Usuario),
        headers:{
            "content-type": "application/json"
        }
    })
        .then(res => res.text())//convertimos a texto el response para usar el body del response y obtener el token
        .then(data => {
            var token = data; //guardamos el token en una variable

            if(token.indexOf(401) != -1){ //si en la data que obtuvimos en lugar del token aparecen los detalles del error buscamos el error y lo mostramos
                alert("No autorizado")
            }else{
                localStorage.setItem("token",token); //almacenamos el token en el localstorage
                formularioLogin.reset();
                document.location.href="../HTML/Index.html";//redireccionamos al index
            }
        })
       
}