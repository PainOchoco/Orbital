import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/Orbital/",
    plugins: [
        react(),
        glsl(),
        VitePWA({
            devOptions: {
                enabled: true,
            },
            srcDir: "src",
            manifest: {
                name: "Orbital App",
                short_name: "Orbital",
                description: "Tracking satellites has never been so easy.",
                theme_color: "#1F2937",
                icons: [
                    {
                        src: "/icons/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/icons/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
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
