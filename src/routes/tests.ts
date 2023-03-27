import express, {Express} from 'express'
import { HTTP_STATUSES } from '../utils'
import { DBType } from '../db/db'

const router = express.Router()

export const getTestsRouter = (db: DBType) => {
    router.get('/ff', (req, res) => {
        console.log('skfskdjsdkfjsdkjsf')
        res.json("HOME_PAGE")
    })



    router.delete('/data', (req, res) => {
        db.courses = []
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })
    router.get('/', (req, res) => {

        res.json('sdgfdghhhjerrssgtrhrthdhsrgg')
    })

    return router
}
