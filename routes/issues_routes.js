const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issues_controller');
const catchAsync = require('../utils/catchAsynch');

router
  .route('/')
  .get(catchAsync(issueController.showIssues))
  .post(catchAsync(issueController.createNewIssue));
  
router
.route('/new')
.get(issueController.renderNew);

router
  .route('/:id/edit')
  .get(catchAsync(issueController.showEditForm))
  .post(catchAsync(issueController.saveEditedIssue));

router
  .route('/:id')
  .get(catchAsync(issueController.showIssueDetails))
  .post(catchAsync(issueController.updateIssue))
  .delete(catchAsync(issueController.deleteIssue));


module.exports = router;
