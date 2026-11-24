import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function FormularioContacto() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [, forceUpdate] = useState(0);

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: 'Este campo es obligatorio.',
        email: 'Debes ingresar un correo válido.',
        min: 'Escribe al menos :min caracteres.'
      }
    })
  );

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setEnviado(false);

    if (validator.current.allValid()) {
      setCargando(true);
      try {
        await addDoc(collection(db, 'consultas'), {
          nombre: nombre,
          correo: correo,
          mensaje: mensaje,
          fecha: new Date().toLocaleString()
        });
        setNombre('');
        setCorreo('');
        setMensaje('');
        validator.current.hideMessages();
        forceUpdate((prev) => prev + 1);
        setEnviado(true);
      } catch (error) {
        alert('Error al guardar en Firebase: ' + error.message);
      } finally {
        setCargando(false);
      }
    } else {
      validator.current.showMessages();
      forceUpdate((prev) => prev + 1);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Ejercicio 2: Formulario de Consulta</h4>
            </div>
            <div className="card-body">
              {enviado && (
                <div className="alert alert-success">
                  Datos guardados correctamente en Firestore Database.
                </div>
              )}

              <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  {validator.current.message('nombre', nombre, 'required|min:3', {
                    className: 'text-danger small mt-1'
                  })}
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  {validator.current.message('correo', correo, 'required|email', {
                    className: 'text-danger small mt-1'
                  })}
                </div>

                <div className="mb-3">
                  <label className="form-label">Mensaje o pedido</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                  ></textarea>
                  {validator.current.message('mensaje', mensaje, 'required|min:10', {
                    className: 'text-danger small mt-1'
                  })}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={cargando}
                >
                  {cargando ? 'Guardando...' : 'Enviar y guardar en Firebase'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioContacto;