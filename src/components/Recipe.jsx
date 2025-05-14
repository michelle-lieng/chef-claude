import { useState } from 'react'

function Recipe({ ingredients }) {
    const [recipe, setRecipe] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleGenerateRecipe = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:8000/generate-recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ ingredients })
            })
            
            if (!response.ok) {
                const errorData = await response.text()
                throw new Error(`Failed to generate recipe: ${errorData}`)
            }
            
            const data = await response.json()
            setRecipe(data)
            
        } catch (error) {
            setError(error.message)
            console.error('Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="Recipe">
            <button 
                onClick={handleGenerateRecipe}
                disabled={isLoading || ingredients.length === 0}
                className="generate-button"
            >
                {isLoading ? 'Generating Recipe...' : 'Generate Recipe'}
            </button>
            
            {error && <p className="error">{error}</p>}
            
            {recipe && (
                <div className="recipe-card">
                    <h2>Recipe</h2>
                    <pre className="recipe-content">{recipe.content}</pre>
                </div>
            )}
        </div>
    )
}

export default Recipe