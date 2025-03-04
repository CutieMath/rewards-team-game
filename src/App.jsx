import { useState, useEffect } from "react";
import "./App.css";
import bgImage from "./assets/bg.jpg";

const questions = [
  "What's been your happiest memory this year?",
  "Has a stranger ever changed your life?",
  "What title would you give this chapter in your life?",
  "What are you most grateful for this year?",
  "What's been your earliest recollection of happiness?",
  "What would your younger self not believe about your life today?",
  "Is there a feeling you miss?",
];

const people = ["Ghia", "Brian", "Peter", "Matt", "Andrew", "Soe", "Yuxin"];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const App = () => {
  const [assignments, setAssignments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false); 
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    const shuffledPeople = shuffleArray(people);
    const shuffledQuestions = shuffleArray(questions);
    const newAssignments = shuffledPeople.map((person, index) => ({
      person,
      question: shuffledQuestions[index],
    }));
    setAssignments(newAssignments);
  }, []);

  const handleNext = () => {
    if (currentIndex < assignments.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setGameFinished(true);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {!hasStarted ? (
        <button
          onClick={() => setHasStarted(true)}
          className="cursor-pointer px-8 py-4 bg-pink-400 text-white text-3xl font-bold rounded-3xl hover:bg-pink-500 transition shadow-lg"
        >
          Start Game 🚀
        </button>
      ) : gameFinished ? (
          <>
            <h1 className="text-6xl font-extrabold text-white drop-shadow-lg bg-pink animate-spin">
              ❤️
            </h1>
            <br />
            <h1 className="text-6xl font-extrabold text-white drop-shadow-lg bg-pink animate-bounce">
              WELL DONE! BEST TEAM EVER!
            </h1>
            <h1 className="text-6xl font-extrabold text-white drop-shadow-lg bg-pink animate-bounce opacity-70">
              WELL DONE! BEST TEAM EVER!
            </h1>
            <h1 className="text-6xl font-extrabold text-white drop-shadow-lg bg-pink animate-bounce opacity-50">
              WELL DONE! BEST TEAM EVER!
            </h1>
          </>
      ) : (
        assignments.length > 0 && (
          <>
            {/* Title */}
            <h1 className="text-5xl font-bold text-white mb-6">
              {assignments[currentIndex].person}
            </h1>
            {/* Card */}
            <div className="bg-white shadow-lg rounded-3xl p-6 w-120 h-80 flex flex-col items-center justify-center text-center">
              <p className="text-3xl font-bold text-gray-600 mt-2">
                {assignments[currentIndex].question}
              </p>
            </div>

            {/* Next / Done Button */}
            <button
              onClick={handleNext}
              className={`cursor-pointer mt-6 px-6 py-3 text-white rounded-3xl text-2xl font-bold transition bg-purple-500 hover:bg-purple-600`}
            >
              {currentIndex === assignments.length - 1 ? "DONE ✨" : "Next"}
            </button>
          </>
        )
      )}
    </div>
  );
};

export default App;
