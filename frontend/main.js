const socket = io.connect('http://localhost:3000/');
socket.on('connected', function () {
    console.log('Connected!!!');
});

const getBoardFilledWith = emptyValue => R.compose(
    R.map(() => R.map(() => emptyValue, R.range(0, 10)))
)(R.range(0, 10))

// const ourShips = getBoardFilledWith(' ')
const ourShips =
    [
        [ '1', ' ', '2', '2', '2', '2', ' ', ' ', ' ', ' ' ],
        [ '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ '1', ' ', '3', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ '1', ' ', '3', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ ' ', ' ', '3', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
        [ ' ', ' ', ' ', ' ', '4', '4', '4', ' ', ' ', ' ' ],
        [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '5' ],
        [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '5' ]
    ]

const targetShip = getBoardFilledWith('u')

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
            ourShips
        };
    }

    componentDidMount() {
        socket.on('started', ({ grid }) => {
            this.setState({
                ourShips: grid
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
                        <Board items={targetShip}/>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));