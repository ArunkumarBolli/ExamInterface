const mongoose = require('mongoose');
const Question = require('./models/Question');
const dotenv = require('dotenv');
dotenv.config();

// Sample questions array
const sampleQuestions = [
    {
        questionText: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2 // Index of "Paris"
    },
    {
        questionText: "Which language is primarily used for web frontend development?",
        options: ["Python", "Java", "C++", "JavaScript"],
        correctAnswer: 3 // Index of "JavaScript"
    },
    {
        questionText: "What does API stand for?",
        options: [
            "Application Programming Interface",
            "Advanced Programming Instruction", 
            "Automated Program Interaction",
            "Application Process Integration"
        ],
        correctAnswer: 0
    },
    {
        questionText: "Which of the following is a JavaScript runtime built on Chrome's V8 engine?",
        options: ["Django", "Flask", "Node.js", "Spring Boot"],
        correctAnswer: 2
    },
    {
        questionText: "Which hook is used to manage state in a React functional component?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1
    }
];

const seedDB = async () => {
    try {
        // 1. Connect to DB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding');

        // 2. Delete any existing questions
        await Question.deleteMany({});
        console.log('Cleared existing questions');

        // 3. Insert the new sample questions
        await Question.insertMany(sampleQuestions);
        console.log('Sample questions added successfully!');

        // 4. Optional: Confirm the insertion
        const questions = await Question.find({});
        console.log(`Total questions in DB: ${questions.length}`);

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // 5. Close the connection
        mongoose.connection.close();
        console.log('Database connection closed.');
    }
};

// Run the function
seedDB();