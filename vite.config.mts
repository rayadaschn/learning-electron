import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'
import ElectronPlugin from 'vite-plugin-electron'
import RendererPlugin from 'vite-plugin-electron-renderer'
import EslintPlugin from 'vite-plugin-eslint'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Vue from '@vitejs/plugin-vue'
import { rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { builtinModules } from 'module'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 项目路径常量
const ROOT_DIR = resolve('.')
const SRC_DIR = resolve(ROOT_DIR, 'src')
const DIST_DIR = resolve(ROOT_DIR, 'dist')
const RENDERER_DIR = resolve(SRC_DIR, 'renderer')
const MAIN_DIR = resolve(SRC_DIR, 'main')
const PRELOAD_DIR = resolve(SRC_DIR, 'preload')

// 构建环境变量配置
const isDevEnv = process.env.NODE_ENV === 'development'
const electronEnvConfig = isDevEnv ? { ELECTRON_ENABLE_LOGGING: 'true' } : {}

// 导出 Vite 配置
export default defineConfig(({ mode }) => {
  const env = {
    ...electronEnvConfig,
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  }
  process.env = env

  // 构建前清理输出目录
  if (isDevEnv) rmSync(DIST_DIR, { recursive: true, force: true })

  const electronPluginConfigs = [
    {
      entry: resolve(MAIN_DIR, 'index.ts'),
      onstart({ startup }) {
        startup()
      },
      vite: {
        root: ROOT_DIR,
        build: {
          assetsDir: '.',
          outDir: resolve(DIST_DIR, 'main'),
          rollupOptions: {
            external: ['electron', ...builtinModules],
          },
        },
      },
    },
    {
      entry: resolve(PRELOAD_DIR, 'index.ts'),
      onstart({ reload }) {
        reload()
      },
      vite: {
        root: ROOT_DIR,
        build: {
          outDir: resolve(DIST_DIR, 'preload'),
        },
      },
    },
    isDevEnv && {
      entry: resolve(MAIN_DIR, 'index.dev.ts'),
      vite: {
        root: ROOT_DIR,
        build: {
          outDir: resolve(DIST_DIR, 'main'),
        },
      },
    },
  ].filter(Boolean)

  return {
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.vue', '.json', '.scss'],
      alias: {
        '@': resolve(dirname(fileURLToPath(import.meta.url)), 'src'),
      },
    },
    base: './',
    root: RENDERER_DIR,
    publicDir: resolve(RENDERER_DIR, 'public'),
    clearScreen: false,
    build: {
      sourcemap: isDevEnv,
      minify: !isDevEnv,
      outDir: DIST_DIR,
    },
    plugins: [
      Vue(),
      VueJsx(),
      EslintPlugin(),
      ElectronPlugin(electronPluginConfigs),
      RendererPlugin(),
      AutoImport({ resolvers: [ElementPlusResolver()] }),
      Components({ resolvers: [ElementPlusResolver()] }),
    ],
  }
})
