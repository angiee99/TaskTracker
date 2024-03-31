const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issues_controller');

router
  .route('/')
  .get(issueController.showIssues)
  .post(issueController.createNewIssue);
  
router
.route('/new')
.get(issueController.renderNew);


router
  .route('/:id')
  .get(issueController.showIssueDetails)
  .post(issueController.updateIssue);


module.exports = router;
