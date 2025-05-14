import { useState } from 'react'

function Ingredients({ ingredients, setIngredients }) {
    const [newIngredient, setNewIngredient] = useState("")

    function handleSubmit(event) {
        event.preventDefault()
        if (newIngredient.trim()) {
            setIngredients([...ingredients, newIngredient.trim()])
            setNewIngredient("")
        }
    }

    function handleRemove(ingredientToRemove) {
        setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove))
    }

    return (
        <>
            <form className="add-ingredient-form" onSubmit={handleSubmit}>
                <input 
                    placeholder="e.g. oregano"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                />
                <button>+ Add Ingredient</button>
            </form>
            <div className="IngredientList"> 
                <h1>Ingredients on hand:</h1>
                <ul>
                    {ingredients.map(ingredient => (
                        <li key={ingredient}>
                            {ingredient}
                            <button 
                                onClick={() => handleRemove(ingredient)}
                                className="remove-button"
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Ingredients