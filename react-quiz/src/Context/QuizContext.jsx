import {createContext, useContext, useEffect, useReducer} from "react";

const QuizContext = createContext();
const initialState = {
    questions: [],
    //loading,error,ready,active,finished
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    secondRemaining: null,
};
function reducer(state, action) {
    switch (action.type) {
        case "dataRecived":
            return {...state, questions: action.payload, status: "ready"};
        case "error":
            return {...state, status: "error"};
        case "active":
            return {...state, status: "active", secondRemaining: state.questions.length * 30};
        case "newAnswer":
            const question = state.questions[state.index];
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points,
            };
        case "newQuestion":
            return {...state, index: state.index + 1, answer: null};
        case "finish":
            return {...state, status: "finished"};
        case "restart":
            return {
                ...state,
                status: "ready",
                index: 0,
                points: 0,
                answer: null,
                secondRemaining: state.questions.length * 30,
            };
        case "tick":
            return {
                ...state,
                secondRemaining: state.secondRemaining - 1,
                status: state.secondRemaining === 0 ? "finished" : state.status,
            };

        default:
            throw new Error("Unknown Error");
    }
}

function QuizContextProvider({children}) {
    
    const [{questions, status, index, answer, points, secondRemaining}, dispatch] = useReducer(reducer, initialState);
    const maxpoints = questions.reduce((prev, curr) => prev + (curr.points), 0)
    useEffect(function () {
        fetch("http://localhost:9000/questions")
          .then(res => res.json())
          .then(data => {dispatch({ type: "dataRecived", payload: data })
        console.log(data)
    }
        )
          .catch(err => dispatch({ type: "error" }))
      }, [])

    return (
        <QuizContext.Provider
            value={{
                questions,
                status,
                index,
                answer,
                points,
                secondRemaining,
                dispatch,
                maxpoints,
                numQuestions: questions.length,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}
function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizContextProvider");
  }
  return context;
}
export {QuizContextProvider, useQuiz};
