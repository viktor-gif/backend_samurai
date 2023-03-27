"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesRouter = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const app_1 = require("../app");
const utils_1 = require("../utils");
exports.router = express_1.default.Router();
const getCoursesRouter = (db) => {
    exports.router.get('/', (req, res) => {
        let foundCourses = db.courses;
        if (req.query.title) {
            foundCourses = foundCourses
                .filter(c => c.title.indexOf(req.query.title) > -1);
        }
        res.json(foundCourses.map(course => (0, app_1.getCourseViewModel)(course)));
    });
    exports.router.get('/:id', (req, res) => {
        const foundCourse = db.courses.find(c => c.id === +req.params.id);
        if (!foundCourse) {
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        res.json((0, app_1.getCourseViewModel)(foundCourse));
    });
    exports.router.post('/', (req, res) => {
        if (!req.body.title) {
            res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const newCourse = {
            id: +(new Date()),
            title: req.body.title,
            studentsCount: 0
        };
        db.courses.push(newCourse);
        res.status(utils_1.HTTP_STATUSES.CREATED_201).json((0, app_1.getCourseViewModel)(newCourse));
    });
    exports.router.delete('/:id', (req, res) => {
        db.courses = db.courses.filter(c => c.id !== +req.params.id);
        res.sendStatus(utils_1.HTTP_STATUSES.NO_CONTENT_204);
    });
    exports.router.put('/:id', (req, res) => {
        if (!req.body.title) {
            res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const foundCourse = db.courses.find(c => c.id === +req.params.id);
        if (!foundCourse) {
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        foundCourse.title = req.body.title;
        res.sendStatus(utils_1.HTTP_STATUSES.NO_CONTENT_204);
    });
    return exports.router;
};
exports.getCoursesRouter = getCoursesRouter;
