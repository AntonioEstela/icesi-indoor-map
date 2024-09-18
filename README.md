# Icesi Indoor Map

Este proyecto es una aplicación web para la visualización y navegación de mapas interiores, utilizando el [SDK de MappedIn](https://developer.mappedin.com/v6/web-sdk-guides/getting-started/). El proyecto está construido con [Vite](https://vitejs.dev/) y se despliega automáticamente en [Vercel](https://vercel.com/) cada vez que se realiza un commit en la rama `master`.

Puedes ver la aplicación en vivo en [icesi-indoor-map.vercel.app](https://icesi-indoor-map.vercel.app/).

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Despliegue](#despliegue)
- [Embeber en un iframe](#embeber-en-un-iframe)
- [Créditos](#créditos)

## Instalación

Para ejecutar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

```bash
git clone https://github.com/AntonioEstela/icesi-indoor-map.git
```

2. Navega al directorio del proyecto:

```bash
cd icesi-indoor-map
```

3. Instala las dependencias utilizando yarn:

```bash
yarn install
```

4. Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

```bash
VITE_MAPPEDIN_API_KEY=your_mappedin_api_key
VITE_MAPPEDIN_API_KEY_SECRET=your_mappedin_api_key_secret
VITE_MAPPEDIN_MAP_ID=your_mappedin_map_id
```

Asegúrate de reemplazar your_mappedin_api_key, your_mappedin_api_key_secret y your_mappedin_map_id con tus propias credenciales de MappedIn.

5. Ejecuta el proyecto en modo de desarrollo:

```bash
yarn dev
```

La aplicación se ejecutará en http://localhost:5173/ o el puerto que se especifique en la terminal.

## Uso

Este proyecto utiliza el SDK de MappedIn para renderizar mapas interiores y ofrece funcionalidades como:

Navegación dentro del mapa.
Búsqueda de ubicaciones.
Puedes interactuar con el mapa y utilizar las funciones de navegación haciendo clic en las áreas del mapa o usando la barra de búsqueda.

## Despliegue

Este proyecto está configurado para desplegarse automáticamente en Vercel cada vez que se realiza un commit en la rama master. No es necesario realizar ningún despliegue manual a menos que se desee hacerlo de manera local.

## Embeber en un iframe

Puedes embeber esta aplicación en cualquier página web utilizando un iframe. Usa el siguiente código HTML para incrustar el mapa interactivo:

```html
<iframe src="https://icesi-indoor-map.vercel.app/" width="100%" height="500"></iframe>
```

## Créditos

Este proyecto fue desarrollado por [Antonio Estela](https://github.com/AntonioEstela).
