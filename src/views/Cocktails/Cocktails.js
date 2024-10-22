import {useDispatch, useSelector} from "react-redux";
import CocktailsContainer from "./_partials/CocktailsContainer";
import {useEffect} from "react";
import {fetchCocktailsFromFilters} from "../../api/Cocktail";
import {initializeCocktails} from "../../features/cocktail/CocktailSlice";

function Cocktails() {
    const filters = useSelector(state => state.filter.value);
    const cocktails = useSelector(state => state.cocktail.list);

    const dispatch = useDispatch();

    useEffect(() => {
        if(filters.alcoholic?.length) {
            fetchCocktailsFromFilters("alcoholic", filters.alcoholic).then(fetchedCocktails => {
                dispatch(initializeCocktails(fetchedCocktails));
            })
        }
    }, [filters]);

    return (
        <>
            <CocktailsContainer cocktails={cocktails} />
        </>
    );
}

export default Cocktails;