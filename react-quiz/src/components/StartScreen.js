function StartScreen({numQuestions,dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to React Quiz!!</h2>
            <h3>{numQuestions} questions to test your React Mastery</h3>
            <button onClick={()=>dispatch({type:"active"})} className="btn btn-ui">Let's start</button>
        </div>
    )
}

export default StartScreen
