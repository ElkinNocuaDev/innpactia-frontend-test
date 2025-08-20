# 📱 Innpactia Frontend Test - Phone Repair App

Este proyecto es el **frontend en Angular 20.2.0** para el sistema de gestión de reparaciones de celulares.  
Se conecta al [backend](https://github.com/ElkinNocuaDev/innpactia-backend-test) mediante una API RESTful e implementa autenticación, gestión de clientes, teléfonos y reparaciones.

---

## 🚀 Tecnologías utilizadas
- **Angular 20.2.0**
- **TypeScript**
- **RxJS**
- **Angular Router**
- **Reactive Forms**
- **TailwindCSS** para estilos modernos
- **JWT Auth** (manejo de token con interceptor HTTP)

---

## 🔧 Requisitos previos
Antes de ejecutar el proyecto, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (v18+ recomendado)  
- [Angular CLI](https://angular.dev/tools/cli)  
- Backend en ejecución → [Innpactia Backend Test](https://github.com/ElkinNocuaDev/innpactia-backend-test)  

---

## 📦 Instalación

Clona el repositorio:

```bash
git clone https://github.com/ElkinNocuaDev/innpactia-frontend-test.git
cd innpactia-frontend-test

Instala dependencias:

npm install

---

Ejecución del servidor

ng serve

La aplicación estará disponible en:
👉 http://localhost:4200/

---

Autenticación

Los usuarios deben registrarse o iniciar sesión en la aplicación.

El token JWT se almacena en localStorage y se añade automáticamente en cada request mediante un interceptor.

Rutas protegidas utilizan un AuthGuard.

---

📚 Funcionalidades principales

👤 Gestión de clientes

Ver lista de clientes

Crear nuevo cliente

📱 Gestión de teléfonos

Consultar teléfonos asociados a un cliente

Registrar nuevo teléfono

🛠 Gestión de reparaciones

Ver todas las reparaciones

Ver reparaciones por teléfono

Registrar nueva reparación

---

👨‍💻 Autor

Elkin Nocua Dev