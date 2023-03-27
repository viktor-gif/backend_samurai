"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = 3004;
app_1.app.listen(port, () => {
    console.log(`example app listening on port ${port}`);
});
