import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(8888)
})

const safeParse = envSchema.safeParse(envSchema)

if(!safeParse.success){
  throw new Error('❌ Váriaveis de ambiente incorretas')
}

export const env = safeParse.data
