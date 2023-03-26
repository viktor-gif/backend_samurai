"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3004;
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
const jsonBody = express_1.default.json();
app.use(jsonBody);
const db = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'devops' },
        { id: 4, title: 'full-stack' }
    ]
};
app.get('/', (req, res) => {
    res.json(HTTP_STATUSES.NOT_FOUND_404);
});
// app.get('/courses', (req, res) => {
//     res.json(db.courses)
// })
app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.json(foundCourse);
});
app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses
            .filter(c => c.title.indexOf(req.query.title) > -1);
    }
    res.json(foundCourses);
});
app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(404);
        return;
    }
    const newCourse = {
        id: +(new Date()),
        title: req.body.title
    };
    db.courses.push(newCourse);
    res.status(HTTP_STATUSES.CREATED_201).json(newCourse);
});
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    foundCourse.title = req.body.title;
    res.json(foundCourse);
});
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
app.listen(port, () => {
    console.log(`example app listening on port ${port}`);
});
