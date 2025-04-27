const express = require('express');
const router = express.Router();
const FeedbackController = require('../controller/feedbackController');

router.post('/', FeedbackController.submitFeedback);

router.get('/', FeedbackController.fetchAllFeedback);

module.exports = router;