import {Button, ButtonGroup, Card, Col, Row} from "react-bootstrap";
import {StarFill} from "react-bootstrap-icons";
import {generatePath, Link} from "react-router-dom";
import {toggleFavorite} from "../../features/cocktail/CocktailSlice";
import {useDispatch, useSelector} from "react-redux";

function CocktailsList({filteredCocktails, cocktails, isFilterOn = false}) {
    const dispatch = useDispatch();

    const myCocktails = useSelector(state => state.cocktail.myCocktails);

    const checkFavorites = (cocktail) => {
        cocktail = {
            idDrink: cocktail.idDrink,
            strDrink: cocktail.strDrink,
            strDrinkThumb: cocktail.strDrinkThumb,
        }

        return myCocktails.map(myCocktail => myCocktail.idDrink).includes(cocktail.idDrink);
    }

    return (
        <>
            <Row className="h-fit-content">
                {isFilterOn && !filteredCocktails.length ? (
                    <>
                        <Col>
                            <p className="text-center">
                                Aucun élément ne correspond à votre recherche.
                            </p>
                        </Col>
                    </>
                ) : (
                    <>
                        {(filteredCocktails?.length ? filteredCocktails : cocktails)?.map((cocktail, index) => (
                            <Col key={index} xl={3} lg={4} md={6} sm={12}>
                                <Card color="light" text="light" bg="dark" className="justify-content-between h-100">
                                    <Button
                                        className={
                                            "btn-favorite d-flex w-fit-content justify-content-center align-items-center p-2 "
                                            + (checkFavorites(cocktail) ? "btn-dark" : "btn-outline-dark btn-light")
                                        }
                                        onClick={() => dispatch(toggleFavorite(cocktail))}>
                                        <StarFill></StarFill>
                                    </Button>
                                    <div>
                                        <Card.Img src={cocktail.strDrinkThumb}/>
                                        <Card.Header>
                                            {cocktail.strDrink}
                                        </Card.Header>
                                    </div>
                                    <Card.Body className="card-body-custom">
                                        <ButtonGroup
                                            className="d-flex justify-content-around"
                                        >
                                            <Link
                                                to={generatePath('/cocktails/:id', {id: cocktail.idDrink})}
                                                className="text-decoration-none text-light"
                                            >Voir</Link>
                                        </ButtonGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </>
                )}
            </Row>
        </>
    )
}

export default CocktailsList;