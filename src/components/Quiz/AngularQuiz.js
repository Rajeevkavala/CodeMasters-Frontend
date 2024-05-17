import React, { useRef, useState } from 'react';
import './Quiz.css';
import { QuizData } from './QuizData/AngularQuizData';

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(QuizData[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  
  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === QuizData.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(QuizData[index]);
      setLock(false);
      option_array.map(option => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(QuizData[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <React.Fragment>
      <div className="Quiz-body">
        <div className="Quiz-Container">
        <div className="quiz-heading">
          <h1>Angular Quiz</h1>
        </div>
          <hr />
          {result ? (
            <>
            <div className="result-div">
              <h2>You Scored {score} out of {QuizData.length}</h2>
              <button onClick={reset}>Reset</button>
            </div>
              <div className="result-container">
                {QuizData.map((quizItem, idx) => (
                  <div key={idx} className="result-item">
                  <hr />
                    <h3>{idx + 1}. {quizItem.question}</h3>
                    <p>Options:</p>
                    <ul>
                      <li className={quizItem.ans === 1 ? "correct" : ""}>{quizItem.option1}</li>
                      <li className={quizItem.ans === 2 ? "correct" : ""}>{quizItem.option2}</li>
                      <li className={quizItem.ans === 3 ? "correct" : ""}>{quizItem.option3}</li>
                      <li className={quizItem.ans === 4 ? "correct" : ""}>{quizItem.option4}</li>
                    </ul>
                    {/* <p className='bold-ans'>Correct Answer: {quizItem[`option${quizItem.ans}`]}</p> */}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>{index + 1}. {question.question}</h2>
              <ul>
                <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
              </ul>
              <button onClick={next}>Next</button>
              <div className="index">{index + 1} of {QuizData.length} questions</div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Quiz;
