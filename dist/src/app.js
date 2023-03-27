"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseViewModel = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const courses_1 = require("./routes/courses");
const tests_1 = require("./routes/tests");
const db_1 = require("./db/db");
exports.app = (0, express_1.default)();
const jsonBodyMiddleware = express_1.default.json();
const getCourseViewModel = (dbCourse) => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    };
};
exports.getCourseViewModel = getCourseViewModel;
exports.app.use(jsonBodyMiddleware);
exports.app.use('/courses', (0, courses_1.getCoursesRouter)(db_1.db));
exports.app.use('/__test__', (0, tests_1.getTestsRouter)(db_1.db));
