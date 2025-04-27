const db = require('../config/db');
async function submitFeedback(req, res, next) {
  try {
    const { userName, email, feedbackText , category } =  req.body;
    const feedback = await createFeedback(userName, email,feedbackText,category);

    res.status(201).json({
      status: 'success',
      message: 'Feedback submitted successfully',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
}

async function fetchAllFeedback(req, res, next) {
  console.log('Fetching all feedback...');
  try {

    const feedback = await getAllFeedback();
    res.status(200).json({
      status: 'success',
      data: {
        feedback,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function createFeedback(user_name, email, feedback_text,feedback_type) {

  const result = await db.query(
    'INSERT INTO feedback ("user_name", email, "feedback_text", "feedback_type") VALUES ($1, $2, $3,$4) RETURNING *',
    [user_name, email, feedback_text,feedback_type]
  );

  return result.rows[0];
}


async function getAllFeedback() {
  const result = await db.query(
    'SELECT * FROM feedback ORDER BY created_at DESC'
  );

  return result.rows;
}



async function countAllFeedback() {
  const result = await db.query('SELECT COUNT(*) FROM feedback');
  return parseInt(result.rows[0].count, 10);
}


module.exports = {
  submitFeedback,
  fetchAllFeedback,
};
