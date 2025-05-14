import { useState } from 'react'
import Header from './components/Header.jsx'
import Ingredients from './components/Ingredients.jsx'
import Recipe from './components/Recipe.jsx'

function App() {
  const [ingredients, setIngredients] = useState([])

  return (
    <>
      <Header />
      <div className="Main">
        <Ingredients 
          ingredients={ingredients} 
          setIngredients={setIngredients} 
        />
        <Recipe ingredients={ingredients} />
      </div>
    </>
  )
}

export default App