const { Router } = require('express');

const usersRouter = require('./users.routes');
const sessionsRouter = require('./sessions.routes');
const rolesRouter = require('./roles.routes');
const dishesRouter = require('./dishes.routes');
const ingredientsRouter = require('./ingredients.routes');

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/roles", rolesRouter);
routes.use("/dishes", dishesRouter);
routes.use("/ingredients", ingredientsRouter);

module.exports = routes;