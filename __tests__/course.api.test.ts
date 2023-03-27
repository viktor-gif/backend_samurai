import request from 'supertest'
import { app } from '../src/app'
import { HTTP_STATUSES } from '../src/utils'
import { CourseCreateModel } from '../src/models/courseCreateModel'

describe('/course', () => {

    beforeAll(async () => {
        await request(app).delete('/__test__/data')
    })

    it('should return 200 and ampty array', async () => {
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    it('should return 404 for not existing course', async () => {
        await request(app)
            .get('/courses/1')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('shouldn\'t create course with incorrect input data', async () => {

        const data: CourseCreateModel = { title: '' }

        await request(app)
            .post('/courses')
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
        
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    let createdCourse1: any = null

    it('should create course with correct input data', async () => {

        const data: CourseCreateModel = { title: 'title from __test__ (correct data)' }

        const createResponse = await request(app)
            .post('/courses')
            .send(data)
            .expect(HTTP_STATUSES.CREATED_201)
        
        createdCourse1 = createResponse.body

        expect(createdCourse1).toEqual({
            id: expect.any(Number),
            title: 'title from __test__ (correct data)'
        })

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [createdCourse1])
    })

    

    it('shouldn\'t update course with incorrect input data', async () => {

        const data: CourseCreateModel = { title: '' }

        await request(app)
            .put(`/courses/${createdCourse1.id}`)
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
            .get(`/courses/${createdCourse1.id}`)
            .expect(HTTP_STATUSES.OK_200, createdCourse1)
    })

    it('shouldn\'t update course that not exists', async () => {
        await request(app)
            .put(`/courses/-9999`)
            .send({ title: 'good title' })
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should update course with correct input data', async () => {

        const data: CourseCreateModel = { title: 'good new title' }

        await request(app)
            .put(`/courses/${createdCourse1.id}`)
            .send(data)
            .expect(HTTP_STATUSES.NO_CONTENT_204)
        
        await request(app)
            .get(`/courses/${createdCourse1.id}`)
            .expect(HTTP_STATUSES.OK_200, {
                ...createdCourse1,
                title: 'good new title'
            })
    })

    it('should update course with correct input data', async () => {

        const data: CourseCreateModel = { title: 'good new title' }

        await request(app)
            .put(`/courses/${createdCourse1.id}`)
            .send(data)
            .expect(HTTP_STATUSES.NO_CONTENT_204)
        
        createdCourse1 = {...createdCourse1, title: 'good new title'}
        
        await request(app)
            .get(`/courses/${createdCourse1.id}`)
            .expect(HTTP_STATUSES.OK_200, {
                ...createdCourse1,
                title: 'good new title'
            })
    })

    let createdCourse2: any = null

    it('create one more course', async () => {

        const data: CourseCreateModel = { title: 'title from __test__ course 2' }

        const createResponse = await request(app)
            .post('/courses')
            .send(data)
            .expect(HTTP_STATUSES.CREATED_201)
        
        createdCourse2 = createResponse.body

        expect(createdCourse2).toEqual({
            id: expect.any(Number),
            title: 'title from __test__ course 2'
        })

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [createdCourse1, createdCourse2])
        
        await request(app)
            .get(`/courses/${createdCourse2.id}`)
            .expect(HTTP_STATUSES.OK_200, createdCourse2)
    })

    it('shouls deleted both courses', async () => {

        console.log('___________________________________' + createdCourse1.id)

        await request(app)
            .delete(`/courses/${createdCourse1.id}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)
        await request(app)
            .get(`/courses/${createdCourse1.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
        
        await request(app)
            .delete(`/courses/${createdCourse2.id}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)
        await request(app)
            .get(`/courses/${createdCourse2.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
        
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })
})