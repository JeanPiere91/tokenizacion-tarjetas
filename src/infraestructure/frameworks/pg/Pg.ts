import { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } from '../../../shared/config'
import { Pool } from 'pg'
import { IDatabaseResponse } from './IDatabaseResponse'


import { Logger } from '../../../shared/logger'
import { LOG_TYPE } from '../../../shared/enum'

export class Pg {
    pool: Pool

    constructor() {
        this.pool = new Pool({
            host: PG_HOST,
            port: PG_PORT,
            database: PG_DATABASE,
            user: PG_USER,
            password: PG_PASSWORD
        })
    }

    executeQuery = async (query: string, parameters: any[] = []): Promise<IDatabaseResponse> => {
        try {
            const result = await this.pool.query(query, parameters);
            const response: IDatabaseResponse = { status: true, data: result.rows }
            return response
        } catch (error) {
            console.log(new Logger(LOG_TYPE.DATABASE, { query: query, parameters: parameters, error: error }))
            return { status: false, data: [] }
        }
    }

    close = async () => {
        await this.pool.end()
    }

}