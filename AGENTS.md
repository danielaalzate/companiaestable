# Publicación de La Compañía Estable

El sitio estático vigente está en `dist/`. Consultar `DEPLOYMENT.md` antes de publicar.

## Flujo de publicación

1. Editar únicamente los archivos necesarios y conservar cambios ajenos.
2. Ejecutar `node validate-static.mjs` y `git diff --check`.
3. Cuando el usuario pida publicar, guardar los cambios de la tarea en un commit y enviarlos con `git push github main` (o el remoto verificado de `danielaalzate/companiaestable`).
4. Verificar que Cloudflare Pages, proyecto `companiaestable`, haya desplegado el commit y comprobar las páginas afectadas en https://lacompaniaestable.com/.

La integración oficial de GitHub está autorizada para este repositorio. No crear ni solicitar tokens temporales para publicaciones habituales. El proyecto manual anterior `la-compania-estable` se conserva para respaldo, no para nuevas publicaciones.

No publicar `archivo-no-publico/`. No subir tokens, `.env`, `.dev.vars` ni cachés `.wrangler/`. No regenerar los HTML con `render-materials.mjs` sin revisar sus diferencias: `dist/` contiene correcciones editoriales posteriores al generador.
