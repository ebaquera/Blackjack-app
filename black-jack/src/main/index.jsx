import "./index.js"
const Body = () =>{
    return (
        <div>
        <h1>Blackjack</h1>
        <p>Price per game: 5</p>
        <p id="dealer-card">Dealer Cards:</p>
        <p id='sum-deal'></p>
        <p id="message-el">Want to play a round?</p>
        <button id='start-btn'>START</button>
        <button id = 'new-card'>HIT</button>
        <button id = 'hold-btn'>STAND</button>
        <br/>
        <p id = 'enter-name'>Enter your name:</p>
        <input type = 'text' id="player-name"/>
        <button id = 'add-name'>SUBMIT</button>
        <p id="cards-el">Your cards:</p>
        <p id="sum-el">Sum:</p>
        <p id="player-el"></p>
        <p id="chips-el"></p>
        <script src="index.js"></script>
        </div>
        )
    }
    export default Body