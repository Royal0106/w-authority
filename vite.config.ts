import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  // Resolves the `~/*` alias declared in tsconfig.json.
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    // SSR, file-based route generation and the production server build.
    // Paths below are relative to `srcDirectory`.
    tanstackStart({
      srcDirectory: 'src',
      router: {
        routesDirectory: 'routes',
        generatedRouteTree: 'routeTree.gen.ts',
        quoteStyle: 'single',
        semicolons: false,
      },
    }),
    viteReact(),
  ],
})
