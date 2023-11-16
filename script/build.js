
const path = require('path')

const target = ['browser'];

(async () => {
  const { execa } = await import('execa')
  run()
  
  async function run (){
    return runParallel()
  }
  
  async function runParallel() {
    return Promise.all(target.map(item => rollupBuild(item)))
  }
  
  /**
   *
   * @param target packages下的文件夹名称
   * @returns {Promise<void>}
   */
  async function rollupBuild(target){
    const pkgDir = path.resolve(__dirname, `../packages/${target}`)
    const pkg = require(`${pkgDir}/package.json`)
    
    if(pkg.private) return
    
    const args = ['-c', '--environment', [`TARGET:${target}`].join(',')]
    
    await execa('rollup', args, {stdio: 'inherit'})
  }
  
})()



