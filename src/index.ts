import express, {Request, Response} from 'express'
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from './types'
import { CourseCreateModel } from './models/courseCreateModel'
import { courseUpdateModel } from './models/courseUpdateModel'
import { GetCoursesBodyModel } from './models/getCoursesBodyModel'
import { CourseParamsModel } from './models/courseParamsModel'
import { CourseViewModel } from './models/courseViewModel'

type CourseType = {
    id: number,
    title: string,
    studentsCount: number
}

export const app = express()
const port = 3004

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}

const jsonBody = express.json()
app.use(jsonBody)

export const db = {
    courses: [
        {id: 1, title: 'front-end', studentsCount: 10},
        {id: 2, title: 'back-end', studentsCount: 10},
        {id: 3, title: 'devops', studentsCount: 10},
        {id: 4, title: 'full-stack', studentsCount: 10}
    ]
}

const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    }
}

app.get('/', (req, res) => {
    res.json(HTTP_STATUSES.NOT_FOUND_404)
})

// app.get('/courses', (req, res) => {
//     res.json(db.courses)
// })

app.get('/courses', (req: RequestWithQuery<CourseCreateModel>,
                    res: Response<CourseViewModel[]>) => {
    let foundCourses = db.courses
    
    if (req.query.title) {
        foundCourses = foundCourses
            .filter(c => c.title.indexOf(req.query.title as string) > -1)
    }
        
    res.json(foundCourses.map(course => getCourseViewModel(course)))
})

app.get('/courses/:id', (req: RequestWithParams<CourseParamsModel>,
                    res: Response<CourseViewModel>) => {
    const foundCourse = db.courses.find(c => c.id === +req.params.id)

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404) 
        return
    }
    res.json(getCourseViewModel(foundCourse))
})

app.post('/courses', (req: RequestWithBody<GetCoursesBodyModel>,
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

app.delete('/courses/:id', (req: RequestWithParams<CourseParamsModel>,
                    res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id)
        
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.put('/courses/:id', (req: RequestWithParamsAndBody<CourseParamsModel, courseUpdateModel>,
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

// app.get('/', (req, res) => {
//     const a = 4;
//     if (a > 5) {
//         res.send('OK!')
//     } else {
//         res.send('Hello world')
//     }
    
// })

// app.get('/samurais', (req, res) => {
//     res.send('Hello samurais!!!!!')
// })

// app.post('/samurais', (req, res) => {
//     res.send('We have created samurai')
// })

app.delete('/__test__/data', (req, res) => {
    db.courses = []
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})