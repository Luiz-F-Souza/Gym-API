import { defineConfig } from 'vitest/config'
import tsConfigPaths from "vitest-tsconfig-paths"



export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environmentMatchGlobs: [
      ['src/http/controllers/**', './vitest-environments/prisma.ts']
    ],
    dir: 'src'
  }
})