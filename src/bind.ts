import type {AbiEvent} from '@subsquid/evm-abi'

export interface EventRecord {
    topics: string[]
    data: string
}

export interface Meta {
    id: string
    block: number
    blockTime: Date
    txHash: string
    logIndex: number
}

export interface Handler {
    topic: string
    entity: Function
    build(rec: EventRecord, meta: Meta): object
}

// Pairs an ABI event with the entity that stores it. Decoded args map 1:1 onto entity
// fields, except for names listed in `renames` (e.g. the `id` param clashes with the entity id).
export function bind<T extends object>(
    event: AbiEvent<any>,
    Entity: new (props: any) => T,
    renames: Record<string, string> = {}
): Handler {
    return {
        topic: event.topic,
        entity: Entity,
        build(rec, meta) {
            const props: Record<string, unknown> = {...meta}
            for (const [key, value] of Object.entries(event.decode(rec))) {
                props[renames[key] ?? key] = normalize(value)
            }
            return new Entity(props)
        },
    }
}

// uint8/int48 decode to JS numbers but are stored as BigInt columns; bigint arrays are stored as decimal strings.
function normalize(value: unknown): unknown {
    if (typeof value === 'number') return BigInt(value)
    if (Array.isArray(value)) return value.map((v) => (typeof v === 'bigint' ? v.toString() : normalize(v)))
    return value
}
