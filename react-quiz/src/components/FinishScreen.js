import { useQuiz } from "../Context/QuizContext"

function FinishScreen() {
    const {points,maxpoints,dispatch}=useQuiz();
    return (
        <>
        <p className="result">
            You Scored <strong>{points} </strong>out of {maxpoints} ({Math.floor((points/maxpoints)*100)}%)
        </p>
        <div>
            <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })} >Restart Quiz</button>
        </div>
        </>
    )
}

export default FinishScreen
