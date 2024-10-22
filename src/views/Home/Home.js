import {ButtonGroup, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {generatePath, Link} from "react-router-dom";
import {fetchRandomCocktail} from "../../api/Cocktail";
import CocktailsContainer from "./_partials/CocktailsContainer";

function Home() {
    const [randomCocktail, setRendomCocktail] = useState(null);
    const [randomCocktailIngredients, setRandomCocktailIngredients] = useState([]);

    useEffect(() => {
        fetchRandomCocktail().then(cocktail => setRendomCocktail(cocktail))
    }, []);

    useEffect(() => {
        if (randomCocktail) {
            let ingredients = Object.keys(randomCocktail).filter(key => key.includes('strIngredient') && randomCocktail[key]).map(key => randomCocktail[key]);
            setRandomCocktailIngredients([...ingredients])
        }
    }, [randomCocktail]);

    return (
        <>
            <Container>
                <h1 className="text-center">Accueil</h1>
                <h2 className="text-center">Cocktail aléatoire</h2>
                <Row>
                    {!randomCocktail ? (
                        <>
                            <p className="text-center">
                                Chargement...
                            </p>
                        </>
                    ) : (
                        <>
                            <Col md={6} xs={12} className="d-flex flex-column justify-content-around">
                                <Image width="100%" src={randomCocktail.strDrinkThumb}/>
                            </Col>
                            <Col md={6} xs={12} className="d-flex gap-4 flex-column justify-content-around">
                                <div>
                                    <ul>
                                        <li>Verre : {randomCocktail.strGlass}</li>
                                        <li>
                                            Alcoolisé : {
                                            randomCocktail.strAlcoholic === "Alcoholic" ? 'Oui' :
                                                (randomCocktail.strAlcoholic === "Non alcoholic" ? 'Non' : 'Optionnel')
                                        }
                                        </li>
                                        <li>Catégorie : {randomCocktail.strCategory}</li>
                                    </ul>
                                    <Card>
                                        <Card.Header>
                                            Ingrédients
                                        </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                {randomCocktailIngredients.map((ingredient, index) => (
                                                    <Col lg={3} md={4} xs={6} key={index}
                                                         className="d-flex flex-column align-items-center">
                                                        <Image width="75%"
                                                               src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}.png`}/>
                                                        <p className="text-center">
                                                            {ingredient}
                                                        </p>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <ButtonGroup className="d-flex justify-content-center">
                                    <Link
                                        to={generatePath('/cocktails/:id', {id: randomCocktail.idDrink})}
                                        className="text-decoration-none btn btn-light"
                                    >Voir</Link>
                                </ButtonGroup>
                            </Col>
                        </>
                    )}
                </Row>
                <h2 className="text-center">Recherche de cocktail par ingrédients</h2>
                <CocktailsContainer />
            </Container>
        </>
    );
}

export default Home;