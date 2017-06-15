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

const targetShip = R.compose(
    R.map(() => R.map(() => 'u', R.range(0, 10)))
)(R.range(0, 10))

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

const OurFleetBoard = props => (
    <div>
        Out board
    </div>
)

const EnemyBoard = props => (
    <div>
        Enemy Board
    </div>
)

const App = props => (
    <div>
        <h1>Pirate's Battleship!!!</h1>
        <div className="boards-container">
            <div className="board-container">
                <Board items={ourShips}/>
            </div>
            <div className="board-container">
                <Board items={targetShip}/>
            </div>
        </div>
    </div>
)

ReactDOM.render(<App />, document.getElementById('app'));