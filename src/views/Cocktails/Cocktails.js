import {useSelector} from "react-redux";
import CocktailsContainer from "./_partials/CocktailsContainer";

function Cocktails() {
    const cocktails = useSelector(state => state.cocktail.list);

    return (
        <>
            <CocktailsContainer cocktails={cocktails} />
        </>
    );
}

export default Cocktails;