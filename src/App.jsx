import CardItem from './components/CardItem'
import Header from './components/header'

function App() {

    const products = [{
        id: 1,
        name: 'Ablaze Tee 1'
    }]

    return (
        <div className="App">
            <Header />
            {products.map(item => (
                <CardItem product={item} />
            ))}
        </div>
    )
}

export default App
