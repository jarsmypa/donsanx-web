import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'donsanx-content',

  projectId: 'kexbt74e',
  dataset: 'production',

  // Solo permite acceso a usuarios autenticados
  auth: {
    // Los usuarios deben usar GitHub OAuth para acceder
    // Configurado en Sanity Cloud Settings
    redirectOnSingle: true,
  },

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
