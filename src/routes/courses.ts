import express, { Response, Express } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '../types'
import { CourseCreateModel } from '../models/courseCreateModel'
import { courseUpdateModel } from '../models/courseUpdateModel'
import { GetCoursesBodyModel } from '../models/getCoursesBodyModel'
import { CourseParamsModel } from '../models/courseParamsModel'
import { CourseViewModel } from '../models/courseViewModel'
import { getCourseViewModel } from '../app'
import { HTTP_STATUSES } from '../utils'
import { CourseType, DBType } from '../db/db'

export const router = express.Router()

export const getCoursesRouter = (db: DBType) => {
    router.get('/', (req: RequestWithQuery<CourseCreateModel>,
                    res: Response<CourseViewModel[]>) => {
        let foundCourses = db.courses
    
        if (req.query.title) {
            foundCourses = foundCourses
                .filter(c => c.title.indexOf(req.query.title as string) > -1)
        }
        
        res.json(foundCourses.map(course => getCourseViewModel(course)))
    })

    router.get('/:id', (req: RequestWithParams<CourseParamsModel>,
                        res: Response<CourseViewModel>) => {
        const foundCourse = db.courses.find(c => c.id === +req.params.id)

        if (!foundCourse) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404) 
            return
        }
        res.json(getCourseViewModel(foundCourse))
    })

    router.post('/', (req: RequestWithBody<GetCoursesBodyModel>,
                        res: Response<CourseViewModel>) => {
        if (!req.body.title) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
            return
        }

        const newCourse: CourseType = {
            id: +(new Date()),
            title: req.body.title,
            studentsCount: 0
        }
        db.courses.push(newCourse)
        res.status(HTTP_STATUSES.CREATED_201).json(getCourseViewModel(newCourse))
    })

    router.delete('/:id', (req: RequestWithParams<CourseParamsModel>,
                        res) => {
        db.courses = db.courses.filter(c => c.id !== +req.params.id)
                        
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })

    router.put('/:id', (req: RequestWithParamsAndBody<CourseParamsModel, courseUpdateModel>,
                        res) => {
        if (!req.body.title) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
            return
        }
        const foundCourse = db.courses.find(c => c.id === +req.params.id)

        if (!foundCourse) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404) 
            return
        }

        foundCourse.title = req.body.title

        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })

    return router
}