# Publicación automática

Repositorio: `danielaalzate/companiaestable`.

El proyecto de Cloudflare Pages `companiaestable` está configurado para publicar automáticamente los commits de `main` mediante la aplicación oficial Cloudflare Workers and Pages de GitHub, autorizada únicamente para este repositorio.

## Configuración

- Rama de producción: `main`.
- Framework: ninguno (sitio estático).
- Directorio raíz: raíz del repositorio.
- Comando de validación: `node validate-static.mjs`.
- Directorio publicable: `dist`.

Editar y validar los archivos en `dist/`, guardar los cambios en Git y enviarlos a `main`. Cloudflare ejecuta la validación y publica la nueva versión automáticamente. No se necesita crear un token de Cloudflare para cada publicación.

Desde esta copia local, el remoto `github` apunta al repositorio de producción. Usar `git push github main` tras validar con `node validate-static.mjs`. Los cambios de documentación también disparan una compilación; el panel de Pages identifica cada despliegue con el commit de GitHub correspondiente.

Para deshacer una actualización, revertir su commit en Git y enviar la reversión a `main`, o seleccionar un despliegue anterior desde Cloudflare Pages. Mantener la integración de GitHub autorizada para este repositorio; no eliminarla al terminar una publicación.

La rama `codex/backup-2026-10-15` conserva la instantánea anterior a la configuración de esta integración. El proyecto antiguo `la-compania-estable` se conserva como respaldo de despliegues manuales.

No publicar `archivo-no-publico/`, no subir credenciales y no ejecutar el generador de materiales sobre los HTML actuales sin revisar los cambios: los archivos de `dist/` contienen las correcciones editoriales vigentes.
