// import logo from './logo.svg';
import { useEffect,useState } from 'react';
import './App.css';

function App() {
const [questions, setQuestions] = useState([])
const [userAnswer, setuserAnsewers] = useState()
const [currentIndex, setCurrentIndex] = useState(0)
const [score , setScore] = useState (0)


 useEffect(function(){
renderApi()
 },[]) 

function renderApi(){
  fetch('https://the-trivia-api.com/v2/questions')
  .then(res => res.json())
  .then(res => {
    res.map(function(item){
      item.options = [...item.incorrectAnswers,item.correctAnswer];
     item.options = shuffle(item.options);
    })
    setQuestions(res)
    console.log(res);
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



function nextq(){
  // setCurrentIndex(currentIndex + 1)
  if(userAnswer === questions[currentIndex].correctAnswer){
   setScore(score + 10)
  }
  setCurrentIndex(currentIndex + 1)
  console.log(questions[currentIndex].correctAnswer);

}
function Restartq(){
  setCurrentIndex(0)
}

function changeText (event){
  const textValue = event.target.value
  console.log(textValue);
setuserAnsewers(textValue)




}







const currentQuetions = questions[currentIndex]

const quizEnded = currentIndex === questions.length

  return (
    <div className="App "> 
      <header className="App-header bg-black   ">
      <h1 className='font-bold text-4xl m-10'><i>Quiz App</i></h1> 
     
     
      {!quizEnded ?  <div className=' q'>
       <h3 className='border 3px bg-black p-4 2px rounded-lg'  >Q.{currentIndex + 1} {currentQuetions.question.text}</h3>

        {currentQuetions.options.map(function(item){
          return <dir>
             <input
              name='answer'
              type="radio" 
              value={item} 
              onChange={changeText}/>
             {item}
          </dir>
        })}

        <h3>
          {score}
        </h3>
<button onClick={nextq}>Next</button>

</div>

:

<div className='r'>
 <h2>Result</h2>



  <button onClick={Restartq}>Restart</button>

</div>

}


      {/* <ol className=' m-2'>
        <li  className='cursor-pointer bg-red-800 m-2 border 2px rounded-lg p-2 '>{questions[currentIndex].correctAnswer} </li>
        <li className=' cursor-pointer bg-red-800 m-2 border 2px rounded-lg p-2 ' >{questions[currentIndex].incorrectAnswers[0]} </li>
        <li className='cursor-pointer bg-red-800 m-2 border 2px rounded-lg p-2 ' >{questions[currentIndex].incorrectAnswers[1]}</li>
        <li className='cursor-pointer bg-red-800 m-2 border 2px rounded-lg p-2 '>{questions[currentIndex].incorrectAnswers[2]}</li>
      </ol> */}

{/* 
      <h4 className='font-normal text-base'>{currentIndex +  1} To 10 Question</h4>

      
      {currentIndex === questions.length -1 ?   
       <button className='border 2px mt-4 rounded-xl bg-red-700 px-5 py-2' onClick={RestartIndex}>Restart</button>
       :
       <button className='border 2px mt-4 rounded-xl bg-blue-700 px-5 py-2' onClick={nextIndex}>Next</button>
      } */}
           
      </header>
    </div>
  );
}

export default App;
