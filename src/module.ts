import { defineNuxtModule, addDevServerHandler, useLogger } from '@nuxt/kit'
import { addCustomTab } from '@nuxt/devtools-kit'
import { joinURL } from 'ufo'
import { eventHandler } from 'h3'
import Swagger from './runtime/server/routes/swagger'
import Redoc from './runtime/server/routes/redoc'
import { cyan, underline } from 'colorette'


// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * OpenApi URL
   */
  url: string | undefined

  /**
   * OpenApi UI options
   */
  ui?: 'swagger' | 'redoc'

  /**
   * Redoc options
   */
  redoc?: {
    legacy?: boolean
  }

  /**
   * Swagger options
   */
  swagger?: {}
}

const logger = useLogger('nuxt:openapi')
const route = '/__openapi'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@woldtwerk/nuxt-openapi',
    configKey: 'openapi'
  },

  // Default configuration options of the Nuxt module
  defaults: {
    url: process.env.OPENAPI_URL,
    ui: 'swagger',
    redoc: {
      legacy: false
    },
    swagger: {}
  },

  setup (options, nuxt) {
    if (!nuxt.options.dev)
      return

    if (!nuxt.options.openapi?.url && nuxt.options.drupal?.url) {
      options.url = joinURL(nuxt.options.drupal.url, 'openapi/jsonapi?_format=json')

      // Drupal only support redoc 1.22
      options.redoc ||= {}
      options.redoc.legacy = true
    }

    addCustomTab({
      name: 'openapi',
      title: 'OpenApi',
      icon: options.ui === 'swagger' ? 'i-logos-swagger' : 'https://cdn.redoc.ly/redoc/logo-mini.svg',
      view: {
        type: 'iframe',
        src: route,
      }
    })

    addDevServerHandler({ route, handler: eventHandler(async event => {
        return options.ui === 'swagger'
          ? await Swagger(event, options)
          : await Redoc(event, options)
      })
    })

    nuxt.hook('listen', (_, listener) => {
      logger.ready(`> ${options.ui}:${options.ui === 'redoc' ? '    ' : '  '}${underline(cyan(joinURL(listener.url, route)))}`)
    })
  }
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    openapi?: ModuleOptions
  }
  interface NuxtOptions {
    openapi: ModuleOptions
    drupal?: {
      url: string
    }
  }
}
