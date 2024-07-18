function Options({ question, dispatch, answer }) {
    return (
        <div className="options">
            {question.options.map((option,index) => (
                <button disabled={answer !== null} onClick={() => dispatch({ type: "newAnswer", payload: index })} key={option} className={`btn btn-option ${answer === index  ? "answer" : ""} ${index===question.correctOption&&(answer!=null)?"correct":((answer!=null)&&"wrong")} `}>
                    {option}
                </button>
            ))}
        </div>
    )
}
export default Options
