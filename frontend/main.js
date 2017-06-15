const socket = io.connect('http://localhost:3000/');
socket.on('connected', function () {
    console.log('Connected!!!');
});

socket.on('end', ({ result, message }) => {
    alert(`${result}: ${message}`);
})

const getBoardFilledWith = emptyValue => R.compose(
    R.map(() => R.map(() => emptyValue, R.range(0, 10)))
)(R.range(0, 10))

const ourShips = getBoardFilledWith(' ')

const targetShips = getBoardFilledWith('u')

const Block = ({ type }) => {
    const className = `board-block board-block-${type}`
    return (
        <div className={className}>
        </div>
    )
}

const BoardRow = ({ items }) => (
    <div className="board-row">
        { R.map(type => <Block type={type} />, items) }
    </div>
)

const Board = ({ items }) => (
    <div className="board">
        { R.map(rowItems => <BoardRow items={rowItems} />, items) }
    </div>
)

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ourShips,
            enemyShips: targetShips
        };
    }

    componentDidMount() {
        socket.on('started', ({ grid }) => {
            this.setState({
                ourShips: grid,
                enemyShips: targetShips
            })
        })

        socket.on('updated', ({ battlefield, enemyBoard }) => {
            console.log(battlefield, enemyBoard, '!!!!!!!!!!!!!!!!!!!!!!')
            this.setState({
                ourShips: battlefield,
                enemyShips: enemyBoard
            })
        })

    }

    render() {
        return (
            <div>
                <h1>Pirate's Battleship!!!</h1>
                <div className="boards-container">
                    <div className="board-container">
                        <Board items={this.state.ourShips}/>
                    </div>
                    <div className="board-container">
                        <Board items={this.state.enemyShips}/>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));