import { join } from 'node:path'

import { defineConfig, loadEnv } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import { pluginStylus } from '@rsbuild/plugin-stylus'
import { WebUpdateNotificationPlugin } from '@plugin-web-update-notification/webpack'
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import { pluginLess } from '@rsbuild/plugin-less';

const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] })
console.log('publicVars===>', publicVars)

export default defineConfig({
  plugins: [pluginReact(), pluginSvgr(), pluginStylus(), pluginLess(),
     pluginModuleFederation({
      name: 'fe_runtime_host',
      // remotes: {
      //   fe_runtime: 'fe_runtime@http://localhost:10001/remoteEntry.js',
      // },
      remotes: {
        fe_runtime_remote: 'fe_runtime_remote@http://localhost:10001/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        'react-dom': { singleton: true, eager: true, requiredVersion: false },
        '@module-federation/bridge-react': {
          singleton: true,
          eager: true,
          requiredVersion: false,
        },
      },
    }),
  ],
  server: {
    port: 8900,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3009',
      },
    }
  },
  html: {
    template: './public/index.html',
  },
  output: {
    polyfill: 'entry',
    legalComments: 'none',
    filename:
      process.env.NODE_ENV === 'production'
        ? {
            js: '[name].[contenthash:16].js',
            css: '[name].[contenthash:16].css',
            svg: '[name].[contenthash:16].svg',
            font: '[name].[contenthash:16][ext]',
            image: '[name].[contenthash:16][ext]',
            media: '[name].[contenthash:16][ext]',
          }
        : {
            js: '[name].js',
            css: '[name].css',
            svg: '[name].[contenthash:16].svg',
            font: '[name].[contenthash:16][ext]',
            image: '[name].[contenthash:16][ext]',
            media: '[name].[contenthash:16][ext]',
          },
  },
  tools: {
    rspack: {
      plugins: [
        process.env.NODE_ENV === 'production' &&
          new WebUpdateNotificationPlugin({
            logVersion: true,
          }),
      ].filter(Boolean) as any,
    },
    // bundlerChain(chain, utils) {
    //   chain.module
    //     .rule('svg')
    //     .oneOf('sprite')
    //     .test(/./)
    //     .include.add(join(__dirname, './src/icons/svg'))
    //     .end()
    //     .before('svg-asset-url')
    //     .use('compat-svg-sprite-loader')
    //     .loader(join(__dirname, './scripts/compat-svg-sprite-loader.mjs'))
    //     .options({ symbolId: 'icon-[name]' })
    //     .end()
    // },
  },
  source: {
    define: publicVars,
    alias: {
      '@': './src',
    },
  },
  // 打包优化
  performance: {
    prefetch: true,
    chunkSplit: {
      strategy: 'single-vendor',
    },
    removeConsole:
      process.env.REACT_APP_API_ENV === 'prod' ||
      process.env.REACT_APP_API_ENV === 'stg',
  },
})
