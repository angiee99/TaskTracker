const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issues_controller');

router
  .route('/')
  .get(issueController.showIssues);


router
  .route('/:id')
  .get(issueController.showIssueDetails);


module.exports = router;
