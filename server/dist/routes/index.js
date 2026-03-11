"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const example_routes_1 = require("../modules/example/example.routes");
const video_routes_1 = require("../modules/video/video.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = (0, express_1.Router)();
router.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
router.use('/examples', example_routes_1.exampleRoutes);
router.use('/api/video', video_routes_1.videoRoutes);
router.use('/api/user', user_routes_1.userRoutes);
exports.routes = router;
//# sourceMappingURL=index.js.map