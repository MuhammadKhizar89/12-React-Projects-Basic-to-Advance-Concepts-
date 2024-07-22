import { useQuiz } from "../Context/QuizContext"
import Options from "./Options"

function Question() {
    const { questions,index, dispatch, answer } = useQuiz();
    const question=questions.at(index);
    return (
        <div>
            <h4>{question.question}</h4>
            <Options dispatch={dispatch} answer={answer} question={question} />
        </div>
    )
}

export default Question
