
import './App.css'

function App() {
    const name = 'Francois'
    const x = false
  return (
      <>
          <h1>Hello from React</h1>
          <h2>Allo {name}</h2>
          <h2>Calcul {1 +1}</h2>
          <h2>Conditionnel {x ? 'vrai' : 'faux'}</h2>
      </>
  )

}

export default App
