import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear state de citas
    const [cita,actualizarCita] = new useState({
        mascota:'',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false)

    // Funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarState = evento => {
        actualizarCita({
            ... cita,
            [evento.target.name]:evento.target.value
        })
    }

    //extraer los valores
    const {mascota, propietario, fecha, hora, sintomas } = cita;

    //CUando el usuario presiona agregar cita

    const submitCita = event => {
        event.preventDefault();
        
        //validar
        if(mascota.trim()==='' || propietario.trim()==='' || 
        fecha.trim()==='' || hora.trim()==='' 
        || sintomas.trim()==='') {

            actualizarError(true)
            return;
        }

        //Eliminar mensaje previo
        actualizarError(false);

        //asignar ID
        cita.id = uuidv4();

        //Crear la cita
        crearCita(cita)

        //Reiniciar el form
        actualizarCita({
            mascota:'',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> :null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascotas</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueno</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueno de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                    onChange={actualizarState}
                >Agregar Cita</button>
            </form>

        </Fragment>
     );
}

Formulario.propTypes ={
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;