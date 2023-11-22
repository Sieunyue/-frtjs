import { execa } from 'execa'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

run()

async function run() {
  return rollupBuild()
}

/**
 *
 * @returns {Promise<void>}
 */
async function rollupBuild() {
  const args = ['-c', path.resolve(__dirname, '../app/sdk/rollup.config.js')]
  
  await execa('rollup', args, { stdio: 'inherit' })
}



