const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issues_controller');
const catchAsync = require('../utils/catchAsynch');
const { validateIssue } = require('../middleware/issue_validation')
const { isAuthorized, isLoggedIn, isAuthor} = require('../middleware/user_authentication')

router
  .route('/')
  .get(isLoggedIn, catchAsync(issueController.showIssues))
  .post(isLoggedIn, validateIssue, catchAsync(issueController.createNewIssue));
  
router
.route('/new')
.get(isLoggedIn, issueController.renderNew);

router
  .route('/:id/edit')
  .get(isLoggedIn, isAuthor, catchAsync(issueController.showEditForm))
  .post(isLoggedIn, isAuthor, validateIssue, catchAsync(issueController.saveEditedIssue));

router
  .route('/:id')
  .get(isLoggedIn, isAuthor, catchAsync(issueController.showIssueDetails))
  .post(isLoggedIn, isAuthor, catchAsync(issueController.updateIssue))
  .delete(isLoggedIn, isAuthor, catchAsync(issueController.deleteIssue));


module.exports = router;
