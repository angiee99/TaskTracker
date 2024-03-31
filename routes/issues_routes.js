const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issues_controller');

router
  .route('/')
  .get(issueController.showIssues);
  
router
.route('/new')
.get(issueController.renderNew);
// .post(issueController.createNewIssue);


router
  .route('/:id')
  .get(issueController.showIssueDetails)
  .post(issueController.updateIssue);


module.exports = router;
