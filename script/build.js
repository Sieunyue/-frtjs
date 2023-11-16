import { execa } from 'execa'

run()

async function run() {
  return rollupBuild()
}

/**
 *
 * @returns {Promise<void>}
 */
async function rollupBuild() {
  const args = ['-c']
  
  await execa('rollup', args, { stdio: 'inherit' })
}



