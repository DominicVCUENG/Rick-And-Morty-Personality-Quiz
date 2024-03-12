import React, { useState, useEffect } from 'react';

import './App.css';

const questions = [
	{
		question: "What is your preferred method of problem-solving?",
		answers: [
			{ text: "Using logic and reason", score: 1 },
			{ text: "Relying on intuition and improvisation", score: 2 },
			{ text: "Seeking guidance from others", score: 3 }
		]
	},
	{
		question: "How do you handle difficult situations?",
		answers: [
			{ text: "Face them head-on with confidence", score: 1 },
			{ text: "Try to avoid them or find a quick solution", score: 2 },
			{ text: "Seek help from friends or family", score: 3 }
		]
	},
	{
		question: "What's your favorite way to spend your free time?",
		answers: [
			{ text: "Experimenting with new ideas or hobbies", score: 1 },
			{ text: "Relaxing and watching TV or movies", score: 2 },
			{ text: "Hanging out with friends or loved ones", score: 3 }
		]
	},
	{
		question: "How do you feel about authority figures?",
		answers: [
			{ text: "Questioning authority is essential", score: 1 },
			{ text: "It's important to respect authority, but sometimes rules are meant to be broken", score: 2 },
			{ text: "I prefer to follow the rules and stay out of trouble", score: 3 }
		]
	},
	{
		question: "If you could have any superpower, what would it be?",
		answers: [
			{ text: "Teleportation", score: 1 },
			{ text: "Invisibility", score: 2 },
			{ text: "Time manipulation", score: 3 }
		]
	},
	{
		question: "What type of humor do you enjoy the most?",
		answers: [
			{ text: "Dark and sarcastic", score: 1 },
			{ text: "Slapstick and silly", score: 2 },
			{ text: "Witty and clever", score: 3 }
		]
	},
	{
		question: "How do you handle failure or setbacks?",
		answers: [
			{ text: "Learn from them and move on", score: 1 },
			{ text: "Get discouraged but eventually bounce back", score: 2 },
			{ text: "Blame others or external factors", score: 3 }
		]
	},
	{
		question: "What motivates you the most?",
		answers: [
			{ text: "Knowledge and discovery", score: 1 },
			{ text: "Personal enjoyment and pleasure", score: 2 },
			{ text: "Helping others and making a difference", score: 3 }
		]
	},
	{
		question: "How do you approach relationships?",
		answers: [
			{ text: "Value independence and freedom", score: 1 },
			{ text: "Enjoy close connections but need space sometimes", score: 2 },
			{ text: "Prioritize loyalty and commitment", score: 3 }
		]
	},
	{
		question: "What's your favorite type of adventure?",
		answers: [
			{ text: "Exploring new dimensions or realms", score: 1 },
			{ text: "Going on wild and unpredictable escapades", score: 2 },
			{ text: "Solving mysteries or puzzles", score: 3 }
		]
	}
];


function App() {
    console.log("Component rendered");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scorenum, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [started, setStarted] = useState(false);
    const [Character, setCharacter] = useState(null);
    const [error, setError] = useState(null);

    const handleAnswerClick = (score) => {
        setScore(scorenum + score);
        if (currentQuestionIndex === questions.length - 1) {
            fetchCharacter();
			setShowResult(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const fetchCharacter = () => {
        fetch(`https://rickandmortyapi.com/api/character/${scorenum}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCharacter(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
		setCharacter(null);
    };

    return (
        <div className="App">
            <header>
				<div id="title-bar">
					<img src="/title-logo.png" alt="not found"></img>
					<h1>
						Personality Quiz
					</h1>
				</div>		
			</header>
            {started ? (
                <div id="quiz">
                    {showResult && !Character ? (
                        <div>Loading...</div>
                    ) : showResult && Character ? (
                        <div id='end-screen'>
                            <h1 id="result">You are</h1>
                            <div>
                                <h2 id="character-name">{Character.name}</h2>
                                <img src={Character.image} alt={Character.name}></img>
                                <p>Status: {Character.status}</p>
                                <p>Species: {Character.species}</p>
                                <p>Gender: {Character.gender}</p>
                                <p>Origin: {Character.origin.name}</p>
                                <p>Last Known Location: {Character.location.name}</p>
                            </div>
                            <button className="restart-btn" onClick={restartQuiz}>Restart Quiz</button>
                        </div>
                    ) : (
                        <>
                            <h1 id="question">{questions[currentQuestionIndex].question}</h1>
                            <div id="answer-buttons">
                                {questions[currentQuestionIndex].answers.map((answer, index) => (
                                    <button key={index} className="btn" onClick={() => handleAnswerClick(answer.score)}>
                                        {answer.text}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div id='start-screen'>
                    <h2>Click Start Quiz to begin!</h2>
                    <button className='start-btn' onClick={() => setStarted(true)}>Start Quiz</button>
                </div>
            )}
        </div>
    );
}

export default App;
