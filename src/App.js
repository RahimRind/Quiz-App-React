// import logo from './logo.svg';
import { useEffect,useState } from 'react';
import './App.css';

function App() {
const [questions, setQuestions] = useState([])
// const [ansewers, setAnsewers] = useState()
const [currentIndex, setCurrentIndex] = useState(0)

 useEffect(function(){
renderApi()
 },[]) 

function renderApi(){
  fetch('https://the-trivia-api.com/v2/questions')
  .then(res => res.json())
  .then(res => setQuestions(res))
}
  if(!questions.length){
    return <h1>Loading...</h1>
  }
function nextIndex(){
  setCurrentIndex(currentIndex + 1)
}
function RestartIndex(){
  setCurrentIndex(0)
}


  return (
    <div className="App "> 
      <header className="App-header bg-black   ">
      <h1 className='font-bold text-4xl m-10'><i>Quiz App</i></h1> 
       <h3 className='border 3px bg-black p-4 2px rounded-lg'  >Q.{currentIndex + 1} {questions[currentIndex].question.text}</h3>
      <ol className=' m-2'>
        <li className='cursor-pointer bg-red-800 m-2 border 2px rounded-lg p-2 '>{questions[currentIndex].correctAnswer} </li>
        <li className='cursor-pointer bg-red-800 m-2 border 2px rounded-lg p-2 ' >{questions[currentIndex].incorrectAnswers[0]} </li>
        <li className='cursor-pointer bg-red-800 m-2 border 2px rounded-lg p-2 ' >{questions[currentIndex].incorrectAnswers[1]}</li>
        <li className='cursor-pointer bg-red-800 m-2 border 2px rounded-lg p-2 '>{questions[currentIndex].incorrectAnswers[2]}</li>
      </ol>


      <h4 className='font-normal text-base'>{currentIndex +  1} To 10 Question</h4>

      
      {currentIndex === questions.length -1 ?   
       <button className='border 2px mt-4 rounded-xl bg-red-700 px-5 py-2' onClick={RestartIndex}>Restart</button>
       :
       <button className='border 2px mt-4 rounded-xl bg-blue-700 px-5 py-2' onClick={nextIndex}>Next</button>
      }
           
      </header>
    </div>
  );
}

export default App;
