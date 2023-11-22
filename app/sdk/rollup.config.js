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
const outDir = path.resolve(__dirname, '../../lib')
const resolvePath = (p) => path.resolve(__dirname, p)

/** @type {import('rollup').RollupOptions} */
export default [
  {
    input: resolvePath('./index.ts'),
    output: [
      {
        file: `${outDir}/index.js`,
        format: 'cjs',
        exports: "named",
        sourcemap: true
      },
      {
        file: `${outDir}/index.esm.js`,
        format: 'esm',
        sourcemap: true
      },
      {
        file: `${outDir}/index.min.js`,
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
        tsconfig: resolvePath('./tsconfig.build.json'),
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
    input: resolvePath('./index.ts'),
    output: [
      {
        file: `${outDir}/index.d.ts`,
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
