

//asignacion de Id para eliminar
function openEliminar(id){
  this.idRol = id;
}
// --------------------------------------------------------------------------
//asignacion de id para modificar
function openModificar(id) {
  this.idRol = id;
}

//-----------------------------------------------------------------------------------------------------------------
//Codigo para el Formulario de crear
const ulRoles = document.querySelector(".ul-roles");
const formularioCrear = document.querySelector("#formulario-crear");
token = "" + localStorage.getItem("token");
url = localStorage.getItem("urlApi");

var roles;
var idRol;

function GetIndex(){
    fetch(this.url + "Rol",{
        method:'GET',
        headers:{
            "content-type": "application/json",
            "Authorization": "Bearer " + this.token
        }
    })
        .then(res => res.json())
        .then(data => {
            this.roles = data;
            let html = "";
//For Each para generar modales
            this.roles.forEach(item => {
                const li = `            
        <div class="col-md-4 mb-4 d-flex justify-content-center align-items-center"> 
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <div class="Badges mb-2">
      </div>
      <h5 class="card-title">Nombre: ${item.nombre}</h5>
      <button type="button" class="btn btn-danger" data-id="${item.id}" onclick="openEliminar(${item.id})" data-bs-toggle="modal" data-bs-target="#modal-eliminar">Borrar</button>
      <button type="button" class="btn btn-success" data-id="${item.id}" onclick="openModificar(${item.id})" data-bs-toggle="modal" data-bs-target="#modal-modificar">Editar</button>
      
</div>
</div>
</div>
                `;
                html += li;
            });

            ulRoles.innerHTML = html;
        })
}

//-----------------------------------------------------------------------------------------------------------------
formularioCrear.addEventListener('submit', (e)=>{//capturamos el evento
    e.preventDefault();//cancela el evento por defecto

    const nombre = document.querySelector('#crear-nombre').value;
    
    CrearRol(nombre)//mandamos a llamar al metodo
})

function CrearRol(nombre){
    const Rol = {
        nombre: nombre
    }

    fetch(this.url + "Rol", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(Rol), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + this.token
        }
      })
      .then(res => {
          console.log(res);
          if(res.status == 200){
            location.reload()
          }else if(res.status == 401){
            alert('No autorizado');
          }else{
              alert('Ocurrio un error');
              formularioCrear.reset();
          }
      });
}
//-----------------------------------------------------------------------------------------------------------------
formulariomodificar = document.querySelector("#formulario-modificar");

 formulariomodificar.addEventListener('submit', (e)=>{//capturamos el evento
   e.preventDefault();//cancela el evento por defecto

   const id = this.idRol;
   const nombre = document.querySelector('#modificar-nombre').value;
  
   ModificarRol(id, nombre)//mandamos a llamar al metodo
 })

function ModificarRol(id, nombre){
    const Rol = {
        id: id,
        nombre: nombre
    }

    fetch(this.url + "Rol/" + this.idRol,{
        method: 'PUT', // Indicamos el tipo de Peticion HTTP a realizar
        body: JSON.stringify(Rol), // convertimos a JSON el objeto Rol
        headers:{
          'Content-Type': 'application/json', //Especificamos el tipo de contenido a enviar en este caso un JSON
          "Authorization": "Bearer " + this.token //Se anexa la autenticacion Bearer token
        }
      }).then(res => {
        console.log(res);
        if(res.status == 200){
          location.reload()
        }else if(res.status == 401){
          alert('No autorizado');
        }else{
            alert('Ocurrio un error');
            formularioCrear.reset();
        }
    });
}
//-----------------------------------------------------------------------------------------------------------------

function EliminarRol(){
    fetch(this.url + "Rol/" + this.idRol,{
        method: 'DELETE', // Indicamos el tipo de Peticion HTTP a realizar
        headers:{
          'Content-Type': 'application/json', //Especificamos el tipo de contenido a enviar en este caso un JSON
          "Authorization": "Bearer " + this.token //Se anexa la autenticacion Bearer token
        }
      }).then(res => {
        console.log(res);
        if(res.status == 200){
          location.reload()
        }else if(res.status == 401){
          alert('No autorizado');
        }else{
            alert('Ocurrio un error');
            formularioCrear.reset();
        }
    });

    console.log(this.idRol)
}
// --------------------------------------------------------------------------------------------------------------------
