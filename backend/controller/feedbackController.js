
async function submitFeedback(req, res, next) {
  try {
    const { user_name, email, feedback_text } = req.body;

    const feedback = await createFeedback({ user_name, email, feedback_text });

    res.status(201).json({
      status: 'success',
      message: 'Feedback submitted successfully',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllFeedback(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;


    const feedback = await getAllFeedback(limit, offset);


    const totalCount = await countAllFeedback();


    res.status(200).json({
      status: 'success',
      data: {
        feedback,
        pagination: {
          total: totalCount,
          page,
          limit,
          pages: Math.ceil(totalCount / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
}



async function createFeedback(feedback) {
  const { user_name, email, feedback_text } = feedback;

  const result = await db.query(
    'INSERT INTO feedback (user_name, email, feedback_text, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
    [user_name, email, feedback_text]
  );

  return result.rows[0];
}


async function getAllFeedback(limit, offset) {
  const result = await db.query(
    'SELECT * FROM feedback ORDER BY created_at DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );

  return result.rows;
}



async function countAllFeedback() {
  const result = await db.query('SELECT COUNT(*) FROM feedback');
  return parseInt(result.rows[0].count, 10);
}


module.exports = {
  submitFeedback,
  getAllFeedback,
};
