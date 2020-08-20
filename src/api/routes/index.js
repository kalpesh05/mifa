const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers");
const { apiAuth, validation } = require("../middlewares");

// Routes list
const routes = [
  // Auth
  {
    method: "POST",
    path: "/register",
    handler: "AuthController.register"
  },
  {
    method: "POST",
    path: "/login",
    handler: "AuthController.login"
  },
  {
    method: "GET",
    path: "/user-profile",
    handler: "AuthController.getMyDetail",
    authenticate: true
  },
  // user
  {
    method: "GET",
    path: "/users",
    handler: "UserController.getAllUsers",
    authenticate: true
  },
  {
    method: "POST",
    path: "/users",
    handler: "UserController.create",
    authenticate: true
  },
  {
    method: "GET",
    path: "/users/:user_id",
    handler: "UserController.getOne",
    authenticate: true
  },
  {
    method: "PUT",
    path: "/users/:user_id",
    handler: "UserController.update",
    authenticate: true
  },
  {
    method: "GET",
    path: "/users/:user_id/report",
    handler: "UserController.getAnswers",
    authenticate: true
  },
  {
    method: "POST",
    path: "/users/student/check",
    handler: "UserController.userCheck",
    authenticate: true
  },
  // question
  {
    method: "POST",
    path: "/questions",
    handler: "QuestionController.create",
    authenticate: true
  },
  {
    method: "GET",
    path: "/questions",
    handler: "QuestionController.getAll",
    authenticate: true
  },
  {
    method: "GET",
    path: "/questions/:question_id",
    handler: "QuestionController.getOne",
    authenticate: true
  },
  {
    method: "PUT",
    path: "/questions/:question_id",
    handler: "QuestionController.update",
    authenticate: true
  },
  {
    method: "DELETE",
    path: "/questions/:question_id",
    handler: "QuestionController.remove",
    authenticate: true
  },
  // answer
  {
    method: "POST",
    path: "/answers",
    handler: "AnswerController.create",
    authenticate: true
  },
  {
    method: "GET",
    path: "/answers",
    handler: "AnswerController.getAll",
    authenticate: true
  },
  {
    method: "GET",
    path: "/answers/:answer_id",
    handler: "AnswerController.getOne",
    authenticate: true
  },
  {
    method: "PUT",
    path: "/answers/:answer_id",
    handler: "AnswerController.update",
    authenticate: true
  },
  {
    method: "DELETE",
    path: "/answers/:answer_id",
    handler: "AnswerController.remove",
    authenticate: true
  },
  // level
  {
    method: "POST",
    path: "/levels",
    handler: "LevelController.create",
    authenticate: true
  },
  {
    method: "GET",
    path: "/levels",
    handler: "LevelController.getAll",
    authenticate: true
  },
  {
    method: "GET",
    path: "/levels/:level_id",
    handler: "LevelController.getOne",
    authenticate: true
  },
  {
    method: "PUT",
    path: "/levels/:level_id",
    handler: "LevelController.update",
    authenticate: true
  },
  {
    method: "DELETE",
    path: "/levels/:level_id",
    handler: "LevelController.remove",
    authenticate: true
  },
  // assesmentType
  {
    method: "POST",
    path: "/assesmentTypes",
    handler: "AssesmentTypeController.create",
    authenticate: true
  },
  {
    method: "GET",
    path: "/assesmentTypes",
    handler: "AssesmentTypeController.getAll",
    authenticate: true
  },
  {
    method: "GET",
    path: "/assesmentTypes/:assesmentType_id",
    handler: "AssesmentTypeController.getOne",
    authenticate: true
  },
  {
    method: "PUT",
    path: "/assesmentTypes/:assesmentType_id",
    handler: "AssesmentTypeController.update",
    authenticate: true
  },
  {
    method: "DELETE",
    path: "/assesmentTypes/:assesmentType_id",
    handler: "AssesmentTypeController.remove",
    authenticate: true
  },
  // submission
  {
    method: "POST",
    path: "/submissions",
    handler: "SubmissionController.create",
    authenticate: true
  },
  {
    method: "GET",
    path: "/submissions",
    handler: "SubmissionController.getAll",
    authenticate: true
  },
  {
    method: "GET",
    path: "/submissions/:submission_id",
    handler: "SubmissionController.getOne",
    authenticate: true
  },
  {
    method: "PUT",
    path: "/submissions/:submission_id",
    handler: "SubmissionController.update",
    authenticate: true
  },
  {
    method: "DELETE",
    path: "/submissions/:submission_id",
    handler: "SubmissionController.remove",
    authenticate: true
  }
];

// Applying routes
routes.forEach(route => {
  const handler = route.handler.split(".");

  let middleware = [(req, res, next) => next()];
  let validationMiddlware = (req, res, next) => {
    console.log("ss", handler);
    validation.validate(req.body, handler);
    next();
  };

  if (route.authenticate) {
    middleware.push(apiAuth);
    middleware.push(passport.authenticate("jwt", { session: false }));
  }

  // Validators
  if (!["get", "delete"].includes(route.method.toLowerCase())) {
    middleware.push(validationMiddlware);
  }
  // console.log(route.path, handler[0], handler[1]);
  router[route.method.toLowerCase()](
    route.path,
    ...middleware,
    controller[handler[0]][handler[1]]
  );
});

exports.router = router;
