import Citas from './Clases/Citas.js'
import UI from './Clases/UI.js'

import { mascotaInput,
         propietarioInput,
         telefonoInput,
         fechaInput,
         horaInput,
         sintomasInput,
         formulario
        } from './Selectores.js'

const ui = new UI();
const administrarCitas = new Citas();

let editando;

// Obj principal con informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

export function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}


// Valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e){
e.preventDefault();

// Extraer la informacion del objeto de cita
const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

// Validar que los campos no esten vacios
if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
    ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

    return;
}

if(editando === true){
    ui.imprimirAlerta('La cita se editó correctamente');

    // Pasar el objeto de la cita a edicion
    administrarCitas.editarCita({...citaObj})
    
    // Regresar el texto del boton a su estado general
    formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

    editando = false
}else{
    // Generar un ID unico
citaObj.id = Date.now();

// Creando una nueva cita
administrarCitas.agregarCita({...citaObj});

// Mensaje de exito
ui.imprimirAlerta('Cita agregada con exito');
}



// Reiniciar el objeto para la validacion
reiniciarObjeto();

// Reiniciar el formulario
formulario.reset();

// Imprimir la cita en el DOM
ui.imprimirCitas(administrarCitas);
}


export function reiniciarObjeto(){
citaObj.mascota = '';
citaObj.propietario = '';
citaObj.telefono = '';
citaObj.fecha = '';
citaObj.hora = '';
citaObj.sintomas = '';
}

export function eliminarCita(id){
// Eliminar la cita
administrarCitas.eliminarCita(id);

// Muestre mensaje
ui.imprimirAlerta('La cita se elimino correctamente');

// Refrescar la pagina
ui.imprimirCitas(administrarCitas);

}

// Cargar los datos y el modo edicion
export function editarCita (cita){
const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

// Llenar los inputs
mascotaInput.value = mascota;
propietarioInput.value = propietario;
telefonoInput.value = telefono;
fechaInput.value = fecha;
horaInput.value = hora;
sintomasInput.value = sintomas;

// Llenar los objetos
citaObj.mascota = mascota;
citaObj.propietario = propietario;
citaObj.telefono = telefono;
citaObj.fecha = fecha;
citaObj.hora = hora;
citaObj.sintomas = sintomas;
citaObj.id = id;

// Cambiar el boton de agregar a editar
formulario.querySelector('button[type="submit"]').innerHTML = 'Guardar Cambios';

editando = true;

}