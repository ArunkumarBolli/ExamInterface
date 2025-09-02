const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { verifyToken } = require('../utils/auth');


router.get('/questions', verifyToken, async (req, res) => {
  try {
    console.log('Fetching questions for user:', req.user.id);
    
    
    const randomQuestions = await Question.aggregate([
      { $sample: { size: 5 } } 
    ]);

    
    const questionsForClient = randomQuestions.map(q => ({
      _id: q._id,
      questionText: q.questionText,
      options: q.options
    }));

    console.log('Sending', questionsForClient.length, 'questions to client');
    res.json(questionsForClient);

  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions from database' });
  }
});


router.post('/submit', verifyToken, async (req, res) => {
  try {
    console.log('Exam submission received from user:', req.user.id);
    
    const { answers } = req.body;
    const allQuestions = await Question.find({});

    let score = 0;
    for (const [questionId, userAnswer] of Object.entries(answers)) {
      const question = allQuestions.find(q => q._id.toString() === questionId);
      if (question && question.correctAnswer === userAnswer) {
        score++;
      }
    }

    res.json({ 
      message: 'Exam submitted successfully!', 
      score, 
      total: allQuestions.length 
    });

  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ message: 'Error submitting exam' });
  }
});

module.exports = router;