import {Col, Row, Spinner} from "react-bootstrap";
import SearchForm from "./SearchForm";
import {useEffect, useState} from "react";
import CocktailsList from "../../common/CocktailsList";

function CocktailsContainer ({cocktails}) {
    const [isLoading, setIsLoading] = useState(true);
    const [filteredCocktails, setFilteredCocktails] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, [cocktails]);

    return (
        <>
            <Row>
                <Col xs={12}>
                    <SearchForm
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        setFilteredCocktails={setFilteredCocktails}
                        filteredCocktails={filteredCocktails}
                    />
                </Col>
                <Col xs={12} className="d-flex justify-content-center">
                    {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        <CocktailsList isFilterOn={true} filteredCocktails={filteredCocktails} cocktails={filteredCocktails} />
                    )}
                </Col>
            </Row>
        </>
    )
}

export default CocktailsContainer;