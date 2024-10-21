import {useSelector} from "react-redux";
import {Container, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import CocktailsList from "./Cocktails/CocktailsList";
import SearchForm from "./Cocktails/SearchForm";

function Cocktails() {
    const [isLoading, setIsLoading] = useState(true);
    const [filteredCocktails, setFilteredCocktails] = useState([]);
    const [isFilterOn, setIsFilterOn] = useState(false);
    const cocktails = useSelector(state => state.cocktail.list);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, [cocktails]);

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
                        {!cocktails.length && !filteredCocktails.length ? (
                            <>
                                Aucun cocktails à charger
                            </>
                        ) : (
                            <>
                                <SearchForm setIsFilterOn={setIsFilterOn} setFilteredCocktails={setFilteredCocktails} />
                                <CocktailsList isFilterOn={isFilterOn} filteredCocktails={filteredCocktails} cocktails={cocktails} />
                            </>
                        )}
                    </>
                )}
            </Container>
        </>
    );
}

export default Cocktails;