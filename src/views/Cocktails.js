import {useDispatch, useSelector} from "react-redux";
import {generatePath, Link} from "react-router-dom";
import {Button, ButtonGroup, Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {addMyCocktail, removeMyCocktail} from "../features/cocktail/CocktailSlice";
import {StarFill} from "react-bootstrap-icons";
import {useEffect, useState} from "react";

function Cocktails() {
    const [isLoading, setIsLoading] = useState(true);
    const [displayedCocktails, setDisplayedCocktails] = useState([]);
    const cocktails = useSelector(state => state.cocktail.list);
    const myCocktails = useSelector(state => state.cocktail.myCocktails);

    const dispatch = useDispatch();

    const toggleFavorite = (cocktail) => {
        if(myCocktails.includes(cocktail)) {
            dispatch(removeMyCocktail(cocktail))
        } else {
            dispatch(addMyCocktail(cocktail))
        }
    }

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
                        {!cocktails.length && !displayedCocktails.length ? (
                            <>
                                Aucun cocktails à charger
                            </>
                        ) : (
                            <>
                                {/* TODO search form with filters */}
                                <Row>
                                    {(displayedCocktails.length ? displayedCocktails : cocktails).map((cocktail, index) => (
                                        <Col key={index} lg={3} md={6} sm={12}>
                                            <Card>
                                                <Card.Img src={cocktail.strDrinkThumb}/>
                                                <Card.Header>{cocktail.strDrink}</Card.Header>
                                                <Card.Body>
                                                    <ButtonGroup
                                                        className="d-flex justify-content-around"
                                                    >
                                                        <Link
                                                            to={generatePath('/cocktails/:id', {id: cocktail.idDrink})}
                                                            className="text-decoration-none text-black"
                                                        >Voir</Link>
                                                        <Button
                                                            className={
                                                                "btn-favorite d-flex justify-content-center align-items-center p-2 "
                                                                + (myCocktails.includes(cocktail) ? "btn-dark" : "btn-outline-dark btn-light")
                                                            }
                                                            onClick={() => toggleFavorite(cocktail)}>
                                                            <StarFill></StarFill>
                                                        </Button>
                                                    </ButtonGroup>
                                                    {/* TODO view button and favorite button */}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </>
                        )}
                    </>
                )}
            </Container>
        </>
    );
}

export default Cocktails;