import {useEffect, useState} from "react";
import {fetchSingleCocktail} from "../../api/Cocktail";
import {useParams} from "react-router-dom";
import {Button, Card, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addMyCocktail, removeMyCocktail} from "../../features/cocktail/CocktailSlice";
import {StarFill} from "react-bootstrap-icons";

function CocktailDetails() {
    const [cocktail, setCocktail] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const myCocktails = useSelector(state => state.cocktail.myCocktails);

    const params = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        fetchSingleCocktail(params.id).then(cocktail => {
            setCocktail(cocktail)
        })
    }, []);

    useEffect(() => {
        if (cocktail) {
            let ingredients = Object.keys(cocktail).filter(key => key.includes('strIngredient') && cocktail[key]).map(key => cocktail[key]);
            setIngredients([...ingredients])

            console.log(cocktail)
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [cocktail]);

    const toggleFavorite = (cocktail) => {
        let newMyCocktail = {
            idDrink: cocktail.idDrink,
            strDrink: cocktail.strDrink,
            strDrinkThumb: cocktail.strDrinkThumb,
        };

        if(myCocktails.includes(newMyCocktail)) {
            dispatch(removeMyCocktail(newMyCocktail))
        } else {
            dispatch(addMyCocktail(newMyCocktail))
        }
    }

    return (
        <>
            <Container>
                {isLoading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <>
                        {!cocktail ? (
                            <>
                                <p>
                                    Aucun cocktail ne correspond à cet id.
                                </p>
                            </>
                        ) : (
                            <>

                                <Row>
                                    <div className="d-flex justify-content-center align-items-center gap-3">
                                        <h1 className="text-center">{cocktail.strDrink}</h1>
                                        <div>
                                            <Button
                                                className={"btn-favorite d-flex w-fit-content justify-content-center align-items-center p-2 "
                                                    + (myCocktails.includes(cocktail) ? "btn-dark" : "btn-outline-dark btn-light")}
                                                onClick={() => toggleFavorite(cocktail)}
                                            >
                                                <StarFill></StarFill>
                                            </Button>
                                        </div>
                                    </div>
                                    <Col md={6} xs={12}>
                                        <Image width="100%" src={cocktail.strDrinkThumb} />
                                    </Col>
                                    <Col md={6} xs={12} className="d-flex justify-content-center">
                                        <Row className="mb-2 align-items-center">
                                            <Col xs={12}>
                                                <Card>
                                                    <Card.Header>Verre</Card.Header>
                                                    <Card.Body className="d-flex align-items-center">{cocktail.strGlass}</Card.Body>
                                                </Card>
                                            </Col>
                                            <Col xs={12}>
                                                <Card>
                                                    <Card.Header>Catégorie</Card.Header>
                                                    <Card.Body className="d-flex align-items-center">{cocktail.strCategory}</Card.Body>
                                                </Card>
                                            </Col>
                                            <Col xs={12}>
                                                <Card>
                                                    <Card.Header>Alcoolisé</Card.Header>
                                                    <Card.Body className="d-flex align-items-center">
                                                        {
                                                            cocktail.strAlcoholic === "Alcoholic" ? 'Oui' :
                                                                (cocktail.strAlcoholic === "Non alcoholic" ? 'Non' : 'Optionel')
                                                        }
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col xs={12}>
                                        <Card>
                                            <Card.Header>Recette</Card.Header>
                                            <Card.Body className="d-flex align-items-center flex-column">
                                                <Row>
                                                    <Card.Title>Ingrédients</Card.Title>
                                                    {ingredients.map((ingredient, index) => (
                                                        <Col lg={3} md={4} xs={6} key={index} className="d-flex flex-column align-items-center">
                                                            <Image width="75%" src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}.png`} />
                                                            <p className="text-center">
                                                                {ingredient}
                                                            </p>
                                                        </Col>
                                                    ))}
                                                    <Card.Title>Instructions</Card.Title>
                                                    <p>
                                                        {cocktail.strInstructions}
                                                    </p>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </>
                )}
            </Container>
        </>
    );
}

export default CocktailDetails;