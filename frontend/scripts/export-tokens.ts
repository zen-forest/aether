import { writeFileSync } from 'node:fs'
import path from 'node:path'

import { buildTokens, serializeTokens } from './tokens.ts'

const outFile = path.resolve(import.meta.dirname, '../tokens.json')
writeFileSync(outFile, serializeTokens(buildTokens()))
console.log(`wrote ${path.relative(process.cwd(), outFile)}`)
