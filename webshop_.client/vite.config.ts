import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

// Betöltjük a .env fájlt
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    const baseFolder =
        env.APPDATA !== undefined && env.APPDATA !== ''
            ? `${env.APPDATA}/ASP.NET/https`
            : `${env.HOME}/.aspnet/https`;

    const certificateName = "webshop_.client";
    const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
    const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

    // Ellenőrizzük, hogy a mappák léteznek-e
    if (!fs.existsSync(baseFolder)) {
        fs.mkdirSync(baseFolder, { recursive: true });
    }

    // Ha nincs tanúsítvány, generálunk egyet
    if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
        console.log("🔹 SSL tanúsítvány generálása...");
        const result = child_process.spawnSync('dotnet', [
            'dev-certs',
            'https',
            '--export-path',
            certFilePath,
            '--format',
            'Pem',
            '--no-password',
        ], { stdio: 'inherit' });

        if (result.status !== 0) {
            throw new Error("❌ Hiba: Nem sikerült létrehozni az SSL tanúsítványt.");
        }
    }

    const backendPort = env.ASPNETCORE_HTTPS_PORT || 5070; // ASP.NET Core backend port
    const target = `https://localhost:${backendPort}`;

    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            proxy: {
                '^/api/': {  // Minden API hívás továbbítása
                    target,
                    changeOrigin: true,
                    secure: false,
                }
            },
            port: parseInt(env.DEV_SERVER_PORT || '49200'),
            https: {
                key: fs.readFileSync(keyFilePath),
                cert: fs.readFileSync(certFilePath),
            }
        }
    };
});
