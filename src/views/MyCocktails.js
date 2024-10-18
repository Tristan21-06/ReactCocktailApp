import {useDispatch, useSelector} from "react-redux";
import {generatePath, Link} from "react-router-dom";
import {Button, ButtonGroup, Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {removeMyCocktail} from "../features/cocktail/CocktailSlice";
import {StarFill} from "react-bootstrap-icons";
import {useEffect, useState} from "react";

function MyCocktails() {
    const [isLoading, setIsLoading] = useState(true);
    const [displayedCocktails, setDisplayedCocktails] = useState([]);
    const myCocktails = useSelector(state => state.cocktail.myCocktails);

    const dispatch = useDispatch();

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
                        {!myCocktails.length && !displayedCocktails.length ? (
                            <>
                                Aucun cocktails enregistré
                            </>
                        ) : (
                            <>
                                {/* TODO search form with filters */}
                                <Row>
                                    {(displayedCocktails.length ? displayedCocktails : myCocktails).map((cocktail, index) => (
                                        <Col key={index} lg={3} md={6} sm={12}>
                                            <Card color="light" text="light" bg="dark">
                                                <Button
                                                    className="btn-favorite d-flex justify-content-center align-items-center p-2 btn-dark"
                                                    onClick={() => dispatch(removeMyCocktail(cocktail))}>
                                                    <StarFill></StarFill>
                                                </Button>
                                                <Card.Img src={cocktail.strDrinkThumb}/>
                                                <Card.Header >
                                                    <Card.Title>
                                                        {cocktail.strDrink}
                                                    </Card.Title>
                                                </Card.Header>
                                                <Card.Body>
                                                    <ButtonGroup
                                                        className="d-flex justify-content-around"
                                                    >
                                                        <Link
                                                            to={generatePath('/cocktails/:id', {id: cocktail.idDrink})}
                                                            className="text-decoration-none"
                                                        >Voir</Link>
                                                    </ButtonGroup>
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

export default MyCocktails;