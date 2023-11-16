const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const typescript = require('rollup-plugin-typescript2')
const { dts } = require('rollup-plugin-dts')
const terser = require('@rollup/plugin-terser')
const { visualizer } = require("rollup-plugin-visualizer")
const sizes = require("rollup-plugin-sizes")

const pkg = process.env.TARGET
/** @type {import('rollup').RollupOptions} */
module.exports = [
  {
    input: `packages/${pkg}/index.ts`,
    output: [
      {
        file: `dist/${pkg}/index.js`,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: `dist/${pkg}/index.esm.js`,
        format: 'esm',
        sourcemap: true
      },
      {
        file: `dist/${pkg}/index.min.js`,
        format: 'iife',
        name: 'frtjs',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      sizes(),
      visualizer({
        title: 'frtjs analyzer',
        filename: 'analyzer.html'
      }),
      commonjs({ exclude: 'node_modules' }),
      json(),
      typescript({
        tsconfig: 'tsconfig.build.json',
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationMap: true,
            declarationDir: `dist/`, // 类型声明文件的输出目录
            module: 'ES2015'
          }
        }
      }),
      terser()
    ]
  },
  {
    input: `packages/${pkg}/index.ts`,
    output: [
      {
        file: `dist/${pkg}/index.d.ts`,
        format: 'esm'
      }
    ],
    plugins: [dts()]
  }
]
