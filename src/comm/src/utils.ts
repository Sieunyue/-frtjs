//解析错误堆栈
const FULL_MATCH =
  /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i


export function parseStackLine(line: string) {
  const lineMatch = line.match(FULL_MATCH)
  if (!lineMatch) return {}
  const filename = lineMatch[2]
  const functionName = lineMatch[1] || ''
  const lineno = parseInt(lineMatch[3], 10) || undefined
  const colno = parseInt(lineMatch[4], 10) || undefined
  return {
    filename,
    functionName,
    lineno,
    colno
  }
}

// 解析错误堆栈
export function parseStackFrames(error: Error, maxDepth = 10) {
  const { stack } = error
  // 无 stack 时直接返回
  if (!stack) return []
  const frames = []
  for (const line of stack.split('\n').slice(1)) {
    const frame = parseStackLine(line)
    if (frame) {
      frames.push(frame)
    }
  }
  return frames.slice(0, maxDepth)
}


export const isJsError = (e: ErrorEvent | Event) => {
  return  e instanceof ErrorEvent
}

export const isResourceError = (e: ErrorEvent | Event) => {
  return !isJsError(e)
}


export const toHashCode = (s: string) => s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);

export const getTimestampValue = () => new Date().valueOf()
