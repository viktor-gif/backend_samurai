import express from 'express'
import { CourseType } from './db/db'
import { CourseViewModel } from './models/courseViewModel'
import { getCoursesRouter } from './routes/courses'
import { getTestsRouter } from './routes/tests'
import {db} from './db/db'

export const app = express()

const jsonBodyMiddleware = express.json()


export const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    }
}



app.use(jsonBodyMiddleware)

app.use('/courses', getCoursesRouter(db))
app.use('/__test__', getTestsRouter(db))