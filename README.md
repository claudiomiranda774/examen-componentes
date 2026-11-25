# Examen Programación de Componentes

**Nombre:** Claudio Miranda Rueda  
**Asignatura:** Programación de Compoentes   
**Institución:** Instituto Profesional Iplacex  
**Web publicada (Netlify):** https://taupe-donut-6ca52b.netlify.app/  
**Repositorio:** https://github.com/claudiomiranda774/examen-componentes  

---

## Sobre el proyecto

Este repositorio contiene el desarrollo del examen final de la asignatura Programación de Componentes. Es una aplicación hecha con React y Vite que reúne los tres ejercicios solicitados, conectada a Firebase y empaquetada también como aplicación para Android (`app-debug.apk`) usando Cordova.

---

## Lo que incluye cada ejercicio

### Ejercicio 1: Catálogo de Productos y Carrito
* Se crearon los componentes `CatalogoProductos` y `ProductoItem` usando componentes de clase.
* Se envían datos y funciones desde el componente padre al hijo mediante `props`.
* Los productos se muestran en pantalla recorriendo el arreglo con `map()`.
* El carrito permite agregar productod, aumentar cantidades y calcular el total automáticamente.

### Ejercicio 2: Formulario y Base de Datos
* En `FormularioContacto` se armó un formulario controlado con validaciones usando `simple-react-validator` (revisa que los campos no vayan vacíos y que el correo tenga un formato válido).
* Al enviar el formulario, los datos se guardan en Firebase Firestore.

### Ejercicio 3: Autenticación, Storage y App Móvil
* En `AuthStorage` se dejó integrada la estructura de Firebase Authentication (registro e inicio de sesión con correo y contraseña) y Firebase Storage para subir y mostrar imágenes.
* Se cambió la navegación a `HashRouter` y se ajustaron las rutas en `vite.config.js` para que la aplicación funcione bien en dispositivos móviles.
* Se generó el archivo instalable `app-debug.apk` usando Cordovasas y Android Studio.

---

## Herramientas utilizadas

* React y Vite
* React Router DOM
* Bootstrap 5
* Simple React Validator
* Firebase (Firestore, Authentication y Storage)
* Cordova y Android Studio

---

## Cómo ejecutar el proyecto en local

1. Clonar el repositorio: `git clone https://github.com/claudiomiranda774/examen-componentes.git`
2. Entrar a la carpeta del proyecto e instalar las dependencias: `npm install`
3. Levantar el servidor local: `npm run dev`