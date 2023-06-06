import type { H3Event } from 'h3'
import type { ModuleOptions } from '../../../module'

export default async (event: H3Event, config: ModuleOptions) => {
  event.node.res.setHeader('Content-Type', 'text/html')

  const redocBundle = config.redoc?.legacy
    ? 'https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js'
    : 'https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js'

  return `
<!DOCTYPE html>
<html>
  <head>
    <title>Redoc</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700"
      rel="stylesheet"
    />

    <!--
    Redoc doesn't change outer page styles
    -->
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <!--
    Redoc element with link to your OpenAPI definition
    -->
    <redoc spec-url="${config.url}"></redoc>
    <!--
    Link to Redoc JavaScript on CDN for rendering standalone element
    -->
    <script src="${redocBundle}"></script>
  </body>
</html>`
}
