// import logo from './logo.svg';
import { useEffect,useState } from 'react';
import './App.css';

function App() {
const [questions, setQuestions] = useState([])
const [userAnswer, setuserAnsewers] = useState()
const [currentIndex, setCurrentIndex] = useState(0)
const [score , setScore] = useState (0)
const [isOptionSelected, setIsOptionSelected] = useState(false);
const [timer, setTimer] = useState(600); // Set the initial timer value in seconds
const [quizEnd, setQuizEnd] = useState(false);


useEffect(() => {
  if (!quizEnd) {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(timerInterval);
          setQuizEnd(true);
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(timerInterval);
  }
}, [quizEnd]);

useEffect(() => {
  renderApi();
}, []);
// useEffect(function(){
// renderApi()
//  },[]) 

function renderApi(){
  fetch('https://the-trivia-api.com/v2/questions')
  .then(res => res.json())
  .then(res => {
    res.map(function(item){
      item.options = [...item.incorrectAnswers,item.correctAnswer];
     item.options = shuffle(item.options);
    })
    setQuestions(res)
    // console.log(res);
  })
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
 

if(!questions.length){
    return <h1>Loading...</h1>
  }



function nextbtn(){
  // setCurrentIndex(currentIndex + 1)
  if(userAnswer === questions[currentIndex].correctAnswer){
   setScore(score + 10)
   setQuizEnd(true)
  }
  setCurrentIndex(currentIndex + 1)
  // console.log(questions[currentIndex].correctAnswer);
  setIsOptionSelected(false) 
}
function Restartbtn(){
  setCurrentIndex(0)
  setIsOptionSelected(false)
  setScore(0)
  setTimer(600)
  setQuizEnd(false)
}


const minutes = Math.floor(timer / 60);
const seconds = timer % 60;

function changeText(event) {
  const textValue = event.target.value;
  // console.log(textValue);
  setuserAnsewers(textValue);
  setIsOptionSelected(true); // Fix the typo here
}


const currentQuestions = questions[currentIndex]

const quizEnded = currentIndex === questions.length

  return (
    <div className="App "> 
      <header className="App-header">
        <div className='border 4px p-5 bg-gray-800 rounded-2xl shadow-2xl'>
      <h1 className='font-bold text-4xl m-10'><i>Quiz App</i></h1> 
     
     
      {!quizEnded ?  <div className=' q'>
      
        
  
       <h3 className='border 3px bg-black p-4 2px rounded-lg'  >Q.{currentIndex + 1} {currentQuestions.question.text}</h3>

        {currentQuestions.options.map(function(item,index){
          return <div key={index}>
             <input
              name='answer'
              type="radio" 
              value={item} 
              onChange={changeText}/>
             {item}
          </div>
        })}
        <div className=' rounded-2xl'>Yuor Score Is {score}</div>

        <div className="text-red-500">
                Time remaining: {minutes} minutes {seconds} seconds
              </div>

        <button onClick={nextbtn} className='border 5px rounded-xl bg-blue-800 px-4' disabled={!isOptionSelected}>
  Next
</button>

</div>

:

<div className='r'>
 {/* <h2>Result</h2> */}

 <h1>Final Results {score} out of {questions.length} </h1>
          <h2>
             Correct  Is Answer =   {(score / questions.length) }
          </h2>
  <h3>Total Result is   {score}% 
  </h3>
  

  <button onClick={Restartbtn}>Restart</button>

</div>
}
</div>    
      </header>
    </div>
  );
}

export default App;
