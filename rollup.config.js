import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import { dts } from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'
import { visualizer } from 'rollup-plugin-visualizer'
import sizes from 'rollup-plugin-sizes'
import alias from '@rollup/plugin-alias'
import path from 'path'
import { fileURLToPath } from 'url'

const sdkName = 'frtjs'
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

/** @type {import('rollup').RollupOptions} */
export default [
  {
    input: `src/index.ts`,
    output: [
      {
        file: `lib/index.js`,
        format: 'cjs',
        exports: "named",
        sourcemap: true
      },
      {
        file: `lib/index.esm.js`,
        format: 'esm',
        sourcemap: true
      },
      {
        file: `lib/index.min.js`,
        format: 'iife',
        name: 'frtjs',
        exports: "named",
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
        useTsconfigDeclarationDir: true
        // tsconfigOverride: {
        //   compilerOptions: {
        //     declaration: true,
        //     declarationMap: true,
        //     declarationDir: `dist/`, // 类型声明文件的输出目录
        //     module: 'ES2015',
        //     paths
        //   }
        // }
      }),
      terser()
    ]
  },
  {
    input: `src/index.ts`,
    output: [
      {
        file: `lib/index.d.ts`,
        format: 'esm'
      }
    ],
    plugins: [
      dts(), alias({
        entries: [
          { find: '@', replacement: path.resolve(__dirname, 'src') }
        ]
      })
    ]
  }
]
