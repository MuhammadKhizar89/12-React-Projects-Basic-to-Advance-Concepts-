import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
const initialState = {
  questions: [],
  //loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondRemaining: null,
}
function reducer(state, action) {
  switch (action.type) {
    case 'dataRecived':
      return { ...state, questions: action.payload, status: "ready" }
    case 'error':
      return { ...state, status: "error" }
    case 'active':
      return { ...state, status: "active" ,secondRemaining:state.questions.length*30}
    case "newAnswer":
      const question = state.questions[state.index];
      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points }
    case "newQuestion":
      return { ...state, index: state.index + 1, answer: null }
    case "finish":
      return { ...state, status: "finished" }
    case "restart":
      return { ...state, status: "ready", index: 0, points: 0, answer: null, secondRemaining: state.questions.length*30 }
    case 'tick':
      return {
        ...state, secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status
      }

    default:
      throw new Error("Unknown Error")
  }
}
export default function App() {
  const [{ questions, status, index, answer, points, secondRemaining }, dispatch] = useReducer(reducer, initialState);
  const maxpoints = questions.reduce((prev, curr) => prev + (curr.points), 0)
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: "dataRecived", payload: data }))
      .catch(err => dispatch({ type: "error" }))
  }, [])
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={questions.length}
          dispatch={dispatch} />}
        {status === 'active' && (<>
          <Progress answer={answer} maxpoints={maxpoints} index={index} numQuestions={questions.length} points={points} />
          <Question question={questions.at(index)} dispatch={dispatch} answer={answer} />
          <footer>
            <Timer secondRemaining={secondRemaining} dispatch={dispatch} />
            <NextButton index={index} numQuestions={questions.length} dispatch={dispatch} answer={answer} />
          </footer>
        </>
        )}
        {status === 'finished' && (<FinishScreen dispatch={dispatch} points={points} maxpoints={maxpoints} />)}
      </Main>
    </div>
  )
}