import { resolve } from 'node:path'
import { searchForWorkspaceRoot } from 'vite'

export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/devtools',
  ],
  devtools: {
    // Enable devtools (default: true)
    enabled: true,
    // VS Code Server options
    vscode: {},
    // ...other options
  },
  // @ts-ignore
  drupal: {
    url: 'https://uedev.localhost',
  },
  typescript: {
    includeWorkspace: true
  },
  // openapi: {
  //   ui: 'redoc',
  //   url: 'https://petstore.swagger.io/v2/swagger.json'
  // },
  vite: {
    server: {
      fs: {
       allow: [
          searchForWorkspaceRoot(process.cwd()),
          resolve(process.cwd(), '../..'),
       ]
      }
    }
  }
})
