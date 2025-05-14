function Main() {

    const ingredients = ["Chicken", "Fish", "Tomatoes", "Cabbage"]
    const ingredientsList = ingredients.map((ingredient) => (
        <li key={ingredient}> {ingredient} </li> 
        )
    )

    function clickFunction(event) {
        event.preventDefault();
        console.log("Form Submitted")
    }
    return(
        <div className="Main">
            <form className="add-ingredient-form" onSubmit={clickFunction}>
                <input placeholder="e.g. oregano"></input>
                <button>+ Add Ingredient</button>
            </form>
            <div className="IngredientList"> 
                <h1>Ingredients on hand:</h1>
                <ul>
                    {ingredientsList}
                </ul>
            </div>
            
        </div>

    )
}

export default Main