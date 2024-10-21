import {useSelector} from "react-redux";
import {Container, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import CocktailsList from "./Cocktails/CocktailsList";
import SearchForm from "./Cocktails/SearchForm";

function MyCocktails() {
    const [isLoading, setIsLoading] = useState(true);
    const [filteredCocktails, setFilteredCocktails] = useState([]);
    const [isFilterOn, setIsFilterOn] = useState(false);
    const myCocktails = useSelector(state => state.cocktail.myCocktails);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, [myCocktails]);

    return (
        <>
            <Container>
                <h2>Liste des cocktails</h2>
                {isLoading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <>
                        {!myCocktails.length && !filteredCocktails.length ? (
                            <>
                                Aucun cocktails enregistré
                            </>
                        ) : (
                            <>
                                <SearchForm
                                    myCocktails={myCocktails}
                                    setIsFilterOn={setIsFilterOn}
                                    setFilteredCocktails={setFilteredCocktails}
                                />
                                <CocktailsList
                                    isFilterOn={isFilterOn}
                                    filteredCocktails={filteredCocktails}
                                    cocktails={myCocktails}
                                />
                            </>
                        )}
                    </>
                )}
            </Container>
        </>
    );
}

export default MyCocktails;