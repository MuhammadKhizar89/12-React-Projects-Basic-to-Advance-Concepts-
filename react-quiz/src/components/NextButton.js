import { useQuiz } from "../Context/QuizContext";

function NextButton() {
    const { dispatch, answer, index, numQuestions } = useQuiz()
    if (answer == null) return null;
    if (index < numQuestions - 1)
        return (
            <div>
                <button className="btn btn-ui" onClick={() => dispatch({ type: "newQuestion" })} >Next</button>
            </div>
        )
    if (index === numQuestions - 1) return (
        <div>
            <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })} >Finish</button>
        </div>
    )
}

export default NextButton
