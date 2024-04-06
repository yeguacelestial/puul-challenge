## Description

Puul Challenge -- Tasks System API, built with NestJS.

## Installation

Setup docker container
```bash
$ docker compose build
```

Initialize docker container
```bash
$ docker compose up
```

Project will run at http://localhost:3000/.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Tasks

### Usuarios
- [x] Endpoint para crear usuarios con los campos: nombre, correo
electrónico y rol (miembro o administrador).
- [x] Endpoint para listar todos los usuarios.
- [x] Agregar filtros por nombre y/o correo y por rol de usuario.
- [x] Incluir la cantidad de tareas terminadas por cada usuario y la suma del costo de todas las tareas terminadas de ese usuario.

### Tareas
- [x] Endpoint para crear tareas incluyendo campos: título, descripción,
estimación de horas, fecha de vencimiento, estado (activa, terminada)
y usuarios asignados (puede ser más de uno), costo monetario por
tarea.
- [x] Endpoint para listar tareas. 
- [x] Incluir ordenamiento de tareas más reciente a menos reciente e incluir filtros por fecha de vencimiento, por nombre de tarea, por usuario asignado y extra: por nombre y/o correo del usuario. Poder asignar múltiples filtros a la vez.
- [x] Endpoint para actualizar cualquier detalle de una tarea, incluyendo la
reasignación de usuarios y la actualización de la estimación de horas.
- [x] Endpoint para eliminar tareas.
- [ ] Endpoint de analítica: Incluir dos estadísticas que veas relevante dado
el contexto del proyecto.