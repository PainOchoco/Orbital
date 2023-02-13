import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/Orbital/",
    plugins: [react(), glsl()],
    resolve: {
        alias: {
            "@tailwindConfig": resolve(__dirname, "tailwind.config.cjs"),
        },
    },
    optimizeDeps: {
        include: ["@tailwindConfig"],
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
});
