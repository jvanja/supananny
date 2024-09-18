const all = new Map()

const bus = {
  all,
  on(type: string, handler: Function) {
    const handlers = all!.get(type)
    if (handlers) handlers.push(handler)
    else all!.set(type, [handler])
  },
  off(type: string, handler: Function) {
    const handlers = all!.get(type)
    if (!handlers) return
    if (handler) handlers.splice(handlers.indexOf(handler) >>> 0, 1)
    else all!.set(type, [])
  },
  emit(type: string, evt:[] = []) {
    let handlers = all!.get(type)
    if (handlers) handlers.slice().map((handler: Function) => handler(evt!))
    handlers = all!.get('*')
    if (handlers) handlers.slice().map((handler: Function) => handler(type, evt!))
  }
}

export default defineNuxtPlugin(() => ({ provide: { bus } }))
