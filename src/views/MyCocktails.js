import {useSelector} from "react-redux";
import CocktailsContainer from "./Cocktails/CocktailsContainer";

function MyCocktails() {
    const myCocktails = useSelector(state => state.cocktail.myCocktails);

    return (
        <>
            <CocktailsContainer cocktails={myCocktails} isFavoriteList={true} />
        </>
    );
}

export default MyCocktails;