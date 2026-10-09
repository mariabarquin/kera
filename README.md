# KERA
Aplicación web de una marca (ficticia) de cosmética natural: KERA. El proyecto combina una interfaz desarrollada con React con una API REST propia, conectada a MongoDB Atlas. Incluye un catálogo de productos, registro e inicio de sesión y operaciones de administración protegidas por roles. 

## APLICACIÓN DESPLEGADA
- **Frontend:** https://kera-frontend.vercel.app/
- **API REST (backend):** https://kera-seven.vercel.app/

La ruta raíz del backend (`/´) devuelve un mensaje de comprobación de la API: "¡API RESTful de KERA funcionando correctamente!"

## FUNCIONALIDADES

### CATÁLOGO Y PRODUCTOS

- Consultar el catálogo de productos almacenados en MongoDB Atlas
- Mostrar nombre, descripción, precio, categoría, stock e imagen de cada producto
- Crear, editar y eliminar producto desde la interfaz (con cuenta de ADMIN)
- Obtener un producto concreto por su identificador a través de la API
- Mostrar estados de carga y mensajes de error al solicitar los productos

### USUARIOS Y ADMINISTRACIÓN

- Registrar una cuenta de usuario
- Iniciar y cerrar sesión
- Cifrar las contraseñas antes de almacenarlas mediante `bcrypts``
- Generar tokens JWT para la autenticación
- Diferenciar roles `customer` y `admin`
- Proteger las operaciones de creación, edición y eliminación sólo realizables por administradores
- Dashboard para admins

El proyecto incluye elementos visuales relacionados con el carrito, pero el flujo completo de carrito, pedidos y pago no está implementado. El botón de añadir al carrito no persiste todavía los productos en un carrito real. 

## TECNOLOGÍAS

| Área | Tecnologías |
|---|---|
| Frontend | React, JavaScript, Vite, React Router, CSS |
| Backend | Node.js, Express |
| Base de datos | MongoDB Atlas, Mongoose |
| Autenticación | JSON Web Tokens (JWT), bcryptjs |
| Comunicación | API REST, Fetch API, CORS |
| Despliegue | Vercel |
| Control de versiones | Git, GitHub |

## ESTRUCTURA DEL PROYECTO

```text
kera/
├── backend/
│   ├── index.js                 # Configuración y arranque de Express
│   ├── src/
│   │   ├── config/db.js         # Conexión con MongoDB Atlas
│   │   ├── controllers/         # Lógica de las operaciones de productos
│   │   ├── middlewares/         # Autenticación, autorización y errores
│   │   ├── models/              # Modelos Mongoose de usuario y producto
│   │   └── routes/              # Rutas de productos y usuarios
│   ├── requests.http            # Peticiones de ejemplo para probar la API
│   ├── kera.postman_collection.json
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/                  # Recursos públicos e iconos
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   ├── pages/               # Páginas de la aplicación
│   │   ├── services/            # Peticiones a la API y autenticación
│   │   ├── styles/              # Estilos de la interfaz
│   │   ├── App.jsx              # Rutas principales
│   │   └── main.jsx             # Punto de entrada de React
│   ├── package.json
│   └── .env.example
├── database_model/              # Documentación de modelos y relación
└── README.md
```

## INSTALACIÓN Y EJECUCCIÓN LOCAL

Se necesita una versión reciente de Node.js y npm, además de una base de datos MongoDB Atlas o una instancia local de MongoDB.

### 1. CLONAR EL REPOSITORIO

```bash
git clone https://github.com/mariabarquin/kera.git
cd kera
```

### 2. CONFIGURAR Y ARRANCAR EL BACKEND

```bash
cd backend
npm install
```

```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombre_db>?retryWrites=true&w=majority
JWT_SECRET=la_clave_secreta
NODE_ENV=development
```

```bash
npm run dev
```

En modo local, la API estará disponible en `https://localhost:3000`.

### 3. CONFIGURAR Y ARRANCAR EL FRONTEND

```bash
cd frontend
npm install
```

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

```bash
npm run dev
```

Abrir en el navegador la dirección local que muestre Vite en la terminal.

### 4. COMPROBAR LA COMPLICACIÓN DEL FRONTEND

Desde la carpeta `frontend/`:

```bash
npm run build
```

El proyecto también incluye el comando `npm run lint` para analizar el código con ESLint.

## Variables de entorno

| Variable | Dónde se configura | Uso |
|---|---|---|
| `PORT` | Backend | Puerto del servidor local |
| `MONGODB_URI` | Backend | Cadena de conexión a MongoDB |
| `JWT_SECRET` | Backend | Clave usada para firmar y verificar los JWT |
| `NODE_ENV` | Backend | Entorno de ejecución |
| `VITE_API_BASE_URL` | Frontend | URL base de la API; en local, `http://localhost:3000/api` |

## API REST

URL base desplegada: `https://kera-seven.vercel.app`

### Productos

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `GET` | `/api/products` | Obtener todos los productos | Público |
| `GET` | `/api/products/:id` | Obtener un producto por ID | Público |
| `POST` | `/api/products` | Crear un producto | Solo administrador |
| `PUT` | `/api/products/:id` | Actualizar un producto | Solo administrador |
| `DELETE` | `/api/products/:id` | Eliminar un producto | Solo administrador |

### Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/users/register` | Registrar un usuario |
| `POST` | `/api/users/login` | Iniciar sesión y obtener un JWT |

Las rutas administrativas requieren un token JWT válido en la cabecera `Authorization` con el formato `Bearer <token>` y un usuario con rol `admin`.

El registro asigna, por defecto, el rol ´customer´. 

## Modelos de datos

Los esquemas de Mongoose se encuentran en `backend/src/models/`:

- **User:** nombre, correo electrónico único, contraseña cifrada, rol, teléfono y dirección. Incluye marcas de tiempo de creación y actualización.
- **Product:** nombre, descripción, precio, categoría, stock y URL de imagen. Incluye marcas de tiempo de creación y actualización.

## Pruebas de la API

Existen dos recursos para probar las peticiones:

- `backend/requests.http`: ejemplos de peticiones HTTP que se pueden ejecutar desde una extensión compatible de Visual Studio Code. Las operaciones protegidas necesitan un JWT válido.
- `backend/kera.postman_collection.json`: colección importable en Postman para probar los endpoints.

Para probar `GET`, `POST`, `PUT` y `DELETE`, están los productos de prueba. Las peticiones que modifican productos necesitan autenticación de administrador.

## Despliegue

El frontend y el backend se despliegan como proyectos separados en Vercel. El frontend debe tener configurada la URL pública de la API en `VITE_API_BASE_URL` (o `VITE_API_URL`) y el backend debe tener configuradas sus variables de entorno, incluida la conexión a MongoDB Atlas y la clave JWT.

## Autoría

Proyecto académico desarrollado como práctica de desarrollo Full Stack, en octubre de 2026. 