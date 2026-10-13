/**
 * In-process locks for aggregators that keep state in memory. Anything that mutates shared state across `await`s
 * (load history, settle new rows, build a result) must go through one, or two callers will interleave and corrupt it.
 * Waiters run in the order they asked, and a failure never blocks the callers behind it.
 */
export class Mutex {
    private tail: Promise<unknown> = Promise.resolve()

    /** Run `fn` once every earlier `run` has finished. */
    run<T>(fn: () => Promise<T>): Promise<T> {
        const result = this.tail.then(fn, fn)
        this.tail = result.catch(() => undefined)
        return result
    }
}

/** One Mutex per key (a wallet, a market, an aggregator name): different keys run in parallel, the same key in order. */
export class KeyedMutex {
    private locks = new Map<string, {mutex: Mutex; waiting: number}>()

    async run<T>(key: string, fn: () => Promise<T>): Promise<T> {
        let entry = this.locks.get(key)
        if (!entry) this.locks.set(key, (entry = {mutex: new Mutex(), waiting: 0}))
        entry.waiting++
        try {
            return await entry.mutex.run(fn)
        } finally {
            // Drop idle keys so a map keyed by wallet address doesn't grow forever.
            if (--entry.waiting === 0) this.locks.delete(key)
        }
    }
}

/** At most `max` jobs run at once; the rest wait their turn (first come, first served). */
export class Semaphore {
    private active = 0
    private waiting: (() => void)[] = []
    peak = 0

    constructor(private max: number) {}

    async run<T>(fn: () => Promise<T>): Promise<T> {
        if (this.active >= this.max) await new Promise<void>((resolve) => this.waiting.push(resolve))
        this.active++
        this.peak = Math.max(this.peak, this.active)
        try {
            return await fn()
        } finally {
            this.active--
            this.waiting.shift()?.()
        }
    }
}

/** Callers asking for the same key while it is running share that one run (and its result or error). */
export class SingleFlight {
    private flying = new Map<string, Promise<unknown>>()
    shared = 0

    do<T>(key: string, fn: () => Promise<T>): Promise<T> {
        const existing = this.flying.get(key)
        if (existing) {
            this.shared++
            return existing as Promise<T>
        }
        const p = fn().finally(() => this.flying.delete(key))
        this.flying.set(key, p)
        return p
    }
}
