import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

// Config para o vitest entender as importações personalizadas com @
export default defineConfig({
  plugins: [tsconfigPaths()],
})
