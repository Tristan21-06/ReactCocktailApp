import {Col, Container, Row, Spinner} from "react-bootstrap";
import SearchForm from "./SearchForm";
import CocktailsList from "../../common/CocktailsList";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

function CocktailsContainer ({cocktails, isFavoriteList = false}) {
    const [isLoading, setIsLoading] = useState(true);
    const [filteredCocktails, setFilteredCocktails] = useState([]);
    const [isFilterOn, setIsFilterOn] = useState(false);
    const myCocktails = useSelector(state => state.cocktail.myCocktails)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, [cocktails]);

    return (
        <>
            <Container>
                <h2>Liste des cocktails</h2>
                <Row>
                    <Col md={3}>
                        <SearchForm
                            filteredCocktails={filteredCocktails}
                            setIsLoading={setIsLoading}
                            isLoading={isLoading}
                            setFilteredCocktails={setFilteredCocktails}
                            setIsFilterOn={setIsFilterOn}
                            myCocktails={isFavoriteList ? myCocktails : null}
                        />
                    </Col>
                    <Col md={9} className="justify-content-center d-flex">
                        {isLoading ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            <>
                                {!cocktails.length && !filteredCocktails.length ? (
                                    <>
                                        Aucun cocktails enregistré
                                    </>
                                ) : (
                                    <>
                                        <CocktailsList
                                            isFilterOn={isFilterOn}
                                            filteredCocktails={filteredCocktails}
                                            cocktails={cocktails}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CocktailsContainer;