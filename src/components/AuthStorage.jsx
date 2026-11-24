import React, { useState, useEffect } from 'react';
import { auth, storage, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function AuthStorage() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [errorAuth, setErrorAuth] = useState('');

  const [archivo, setArchivo] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [mensajeArchivo, setMensajeArchivo] = useState('');
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, (userActual) => {
      setUsuario(userActual);
    });
    cargarImagenes();
    return () => desuscribir();
  }, []);

  const cargarImagenes = async () => {
    try {
      const consulta = await getDocs(collection(db, 'imagenes'));
      const lista = consulta.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setImagenes(lista);
    } catch (error) {
      console.error(error);
    }
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();
    setErrorAuth('');
    try {
      await createUserWithEmailAndPassword(auth, correo, clave);
      setCorreo('');
      setClave('');
    } catch (error) {
      setErrorAuth('Error al registrar: ' + error.message);
    }
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setErrorAuth('');
    try {
      await signInWithEmailAndPassword(auth, correo, clave);
      setCorreo('');
      setClave('');
    } catch (error) {
      setErrorAuth('Error al iniciar sesión: ' + error.message);
    }
  };

  const cerrarSesion = async () => {
    await signOut(auth);
  };

  const convertirImagenReducida = (file) => {
    return new Promise((resolve) => {
      const lector = new FileReader();
      lector.onload = (evento) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxAncho = 500;
          const escala = maxAncho / img.width;
          canvas.width = img.width > maxAncho ? maxAncho : img.width;
          canvas.height = img.width > maxAncho ? img.height * escala : img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.src = evento.target.result;
      };
      lector.readAsDataURL(file);
    });
  };

  const subirArchivo = async (e) => {
    e.preventDefault();
    if (!archivo) {
      setMensajeArchivo('Primero selecciona una imagen.');
      return;
    }

    setSubiendo(true);
    setMensajeArchivo('');

    let urlFinal = '';

    try {
      const archivoRef = ref(storage, `archivos/${Date.now()}_${archivo.name}`);
      await uploadBytes(archivoRef, archivo);
      urlFinal = await getDownloadURL(archivoRef);
    } catch {
      urlFinal = await convertirImagenReducida(archivo);
    }

    try {
      await addDoc(collection(db, 'imagenes'), {
        nombre: archivo.name,
        url: urlFinal,
        usuario: usuario.email,
        fecha: new Date().toLocaleString()
      });
      setArchivo(null);
      e.target.reset();
      setMensajeArchivo('Imagen subida y guardada correctamente.');
      await cargarImagenes();
    } catch (error) {
      setMensajeArchivo('Error al guardar: ' + error.message);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Ejercicio 3: Autenticación y Subida de Archivos</h2>

      <div className="row">
        <div className="col-md-5 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Firebase Authentication</h5>
            </div>
            <div className="card-body">
              {usuario ? (
                <div>
                  <div className="alert alert-success">
                    Sesión activa como: <strong>{usuario.email}</strong>
                  </div>
                  <button
                    className="btn btn-danger w-100"
                    onClick={cerrarSesion}
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <form>
                  {errorAuth && (
                    <div className="alert alert-danger small">{errorAuth}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      placeholder="usuario@correo.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña (mínimo 6 caracteres)</label>
                    <input
                      type="password"
                      className="form-control"
                      value={clave}
                      onChange={(e) => setClave(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={iniciarSesion}
                    >
                      Iniciar sesión
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={registrarUsuario}
                    >
                      Registrar nuevo usuario
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-7 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Firebase Storage (Galería de Imágenes)</h5>
            </div>
            <div className="card-body">
              {!usuario ? (
                <p className="text-muted mb-0">
                  Inicia sesión en el panel izquierdo para habilitar la subida de archivos.
                </p>
              ) : (
                <div>
                  {mensajeArchivo && (
                    <div className="alert alert-info small">{mensajeArchivo}</div>
                  )}
                  <form onSubmit={subirArchivo} className="mb-4">
                    <div className="mb-3">
                      <label className="form-label">Seleccionar imagen</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setArchivo(e.target.files[0])}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success w-100"
                      disabled={subiendo}
                    >
                      {subiendo ? 'Subiendo archivo...' : 'Subir imagen'}
                    </button>
                  </form>

                  <h6 className="border-bottom pb-2">Archivos subidos</h6>
                  {imagenes.length === 0 ? (
                    <p className="text-muted small">Aún no hay imágenes subidas.</p>
                  ) : (
                    <div className="row">
                      {imagenes.map((img) => (
                        <div key={img.id} className="col-sm-6 mb-3">
                          <div className="card h-100">
                            <img
                              src={img.url}
                              alt={img.nombre}
                              className="card-img-top"
                              style={{ height: '140px', objectFit: 'cover' }}
                            />
                            <div className="card-body p-2">
                              <p className="card-title small fw-bold mb-1 text-truncate">
                                {img.nombre}
                              </p>
                              <p className="card-text text-muted" style={{ fontSize: '11px' }}>
                                Subido por: {img.usuario}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthStorage;