import type { H3Event } from 'h3'
import type { ModuleOptions } from '../../../module'

export default async (event: H3Event, config: ModuleOptions) => {
  event.node.res.setHeader('Content-Type', 'text/html')

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="SwaggerUI"
    />
    <title>SwaggerUI</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css" />
    <link rel="text" href="https://unpkg.com/swagger-themes@latest/themes/v3/dark.css" />
    <script type="module">
      const css = await fetch('https://unpkg.com/swagger-themes@latest/themes/v3/dark.css')
      const sheet = new CSSStyleSheet()
      sheet.replaceSync(await css.text())

      if (localStorage.getItem('nuxt-color-mode') === 'dark') {
        document.adoptedStyleSheets = [sheet]
      }

      addEventListener('storage', (event) => {
        if (event.key === 'nuxt-color-mode' && event.newValue === 'dark') {
          document.adoptedStyleSheets = [sheet]
        }
        if (event.key === 'nuxt-color-mode' && event.newValue === 'light') {
          document.adoptedStyleSheets = []
        }
      })
    </script>
  </head>
  <body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js" crossorigin></script>
  <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-standalone-preset.js" crossorigin></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '${config.url}',
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout",
      });
    };
  </script>
  </body>
</html>`
}
