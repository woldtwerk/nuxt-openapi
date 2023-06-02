import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { addCustomTab } from '@nuxt/devtools-kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * OpenApi URL
   */
  url: string

  /**
   * Add Swagger in Nuxt Devtools
   * @default true
  */
  devtools?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@woldtwerk/nuxt-openapi',
    configKey: 'openapi'
  },

  // Default configuration options of the Nuxt module
  defaults: {
    url: process.env.DRUPAL_API_URL,
    devtools: true
  },

  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    nuxt.options.dev && options.devtools && addCustomTab({
      name: 'openapi',
      title: 'OpenApi',
      icon: 'i-logos-swagger',
      view: {
        type: 'iframe',
        src: '/__openapi/'
      }
    })
  }
})

// declare module '@nuxt/schema' {
//   interface NuxtConfig {
//     openapi?: ModuleOptions
//   }
//   interface NuxtOptions {
//     openapi?: ModuleOptions
//   }
// }
