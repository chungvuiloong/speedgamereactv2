const Gameover = (props) => {
    return (
    <div class="overlay">
        <div className="gameover_box">
            <p>Game Over</p>
            <p id="result">Score was: {props.score}</p>
            <p id="commentResult">{props.commentResult}</p>
            <button type="button" id="close" onClick={props.close}>close</button>
        </div>
    </div>
    );
};

export default Gameover;