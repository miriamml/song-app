# Prueba Tecnica - Song App
> Autora: Miriam Martin Luna 

Este proyecto proporciona una aplicacion web basica que permite gestiona un catalogo de canciones.

Forma parte de la prueba tecnica para **Sequence**.

A continuacion dejo una serie de notas y comentarios, sobre detalles que he encontrado durante el desarrllo.

- He usado la version `0.17.0` de `json-server`. Ya que la ultima version beta ha eliminado la opcion de delay. Y la solucion que propone el desarrollador de la herramienta, es usar el throotle de peticiones HTTP de las herramientas de desarrollador de Chrome. El cual no me parece optima ya que limite el trafico de cualquier peticion, incluidos ficheros js, css, imagenes, etc..
- He definido un script de npm llamado `api` que permite levantar el servidor mock. Ejecutar `npm run api`.
- He usado Angular Material. La implementacion oficial de Material Design para Angular. Ya que es una de las librerias UI mas solidas y con mas comunidad del framework. Ademas, tengo experiencia en ella.

## Modularizacion

Aunque no he hecho uso de modulos con `@NgModule`. La aplicacion esta dividida en modulos por functionalidad (Module-per-feature).

- Modulo `common`: Contiene componentes base como el layout y el estado de la app
- Modulo `song`. Contiene componentes y el estado necesario para gestionar canciones, ver la lista y editar canciones.

## Estado de la app

Para la gestion del estado de la app, he decidido usar NgRx. Ya que el estado es practicamente local y no existen variables globales, he optado por usar `SignalStore`. Un mecanismo que permite crear Stores de NgRx usando Signal.

Muy comodo para manejar el estado de varios componentes o de un modulo. Su modo de funcionamiento es similar a otras librerias de otros frameworks como Pinia o Vuex. Con los que tambien he trabajado y me he sentido bastante comoda. 



https://ngrx.io/guide/signals/signal-store

