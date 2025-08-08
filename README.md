# 📚 Sistema de Gestión de Biblioteca - SQL + Node.js

Este es un proyecto de backend para una biblioteca digital que permite gestionar usuarios, libros y préstamos utilizando **MySQL**, **Node.js** y **Express**. Además, cuenta con **carga automática de datos desde archivos CSV** y soporte para endpoints RESTful.

---

## 🧱 Estructura del Proyecto

```bash
BIBLIOTECA_SQL/
├── app/
│ └── css/ js/ # Frontend (estático)
├── docs/ # Documentación (modelo relacional, script SQL)
├── node_modules/ # Dependencias
├── server/
│ ├── config/ # Configuración de la DB (db.js)
│ ├── controllers/ # Lógica de los endpoints (prestamos.controllers.js)
│ ├── data/ # Archivos CSV de carga inicial
│ ├── routes/ # Rutas del servidor (prestamos.routes.js)
│ ├── seeders/ # Scripts para poblar la base de datos
│ └── app.js # Configuración de Express
│ └── index.js # Punto de entrada principal del servidor
├── .env # Variables de entorno (no se sube al repo)
├── .env.example # Plantilla para variables de entorno
├── nodemon.json # Configuración de desarrollo
├── .gitignore # Ignorar archivos sensibles
├── package.json # Dependencias y scripts
└── README.md # Este archivo
```

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/biblioteca_SQL.git
cd biblioteca_SQL
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` basado en `.env.example`
```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=123456
DB_NAME=biblioteca
```

### 4. Crear la base de datos

Importa el archivo `docs/script.sql` desde tu gestor MySQL para crear las tablas necesarias.

---

## 🌱 Poblar Base de Datos con Seeders

Ejecuta el siguiente comando para cargar los datos desde los archivos `.csv` ubicados en `server/data/`:

```bash
npm run seed
```

Este script ejecuta `server/seeders/run_seeders.js` para poblar la base de datos con datos iniciales (usuarios, libros y préstamos).

---

## 🖥️ Levantar el Servidor en Modo Desarrollo

El servidor usa `nodemon` para reiniciarse automáticamente en cada cambio:

```bash
npm run dev
```

El servidor estará disponible en:  
```
http://localhost:3000
```

---

## 🌐 Endpoints Disponibles

| Método | Ruta                         | Descripción                    |
|--------|------------------------------|--------------------------------|
| GET    | `/api/v1/prestamos`          | Obtener todos los préstamos    |
| GET    | `/api/v1/prestamos/:id`      | Obtener un préstamo por ID     |
| POST   | `/api/v1/prestamos`           | Crear un nuevo préstamo        |
| PUT    | `/api/v1/prestamos/:id`       | Actualizar un préstamo         |
| DELETE | `/api/v1/prestamos/:id`       | Eliminar un préstamo           |

> Todas las respuestas se devuelven en formato JSON.

---

## 🔧 Scripts Útiles

| Comando         | Descripción                                 |
|----------------|---------------------------------------------|
| `npm run dev`  | Inicia el servidor con nodemon              |
| `npm run seed` | Ejecuta la carga inicial de datos (CSV)     |

---

## 🧠 Tecnologías Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [MySQL2 (driver)](https://www.npmjs.com/package/mysql2)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [csv-parser](https://www.npmjs.com/package/csv-parser)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [Thunder Client](https://www.thunderclient.com/) (para pruebas de API)

---

## 👤 Autor

**Yoelmis Perdomo**  
Proyecto educativo de backend con enfoque práctico en bases de datos, seeders automáticos, y consumo mediante API RESTful.  
Este proyecto está pensado para **formar una base sólida** en arquitectura de backend, modularización de código y buenas prácticas en el desarrollo de APIs.

---