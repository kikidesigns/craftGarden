import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="galaxy">
      <h1>Welcome to My Galaxy</h1>
      <p>Explore the stars and beyond!</p>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  )
}

export default App