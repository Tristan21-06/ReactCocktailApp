import {Button, ButtonGroup, Col, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {handleSearchForm} from "../../api/Cocktail";

function SearchForm({filteredCocktails, setIsLoading, isLoading, setFilteredCocktails, setIsFilterOn, myCocktails}) {
    const [searchObject, setSearchObject] = useState({});
    const filters = useSelector(state => state.filter.value);

    useEffect(() => {
        if (searchObject && Object.keys(searchObject).length) {
            handleSearchForm(searchObject, myCocktails)
                .then(cocktails => {
                    setFilteredCocktails([
                        ...cocktails
                    ]);
                });
        }
    }, [searchObject]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, [filteredCocktails]);

    const filterCocktails = (event) => {
        event.preventDefault();

        setIsLoading(true);

        const formData = new FormData(event.target);

        const category = formData.get('category');
        const alcoholic = formData.get('alcoholic');
        const glass = formData.get('glass');
        const ingredients = formData.getAll('ingredients');
        const search = formData.get('search');

        let searchObject = {filters: {}};
        let filters = 0;

        if (category) {
            searchObject.filters.categories = [category];
            filters++;
        }

        if (alcoholic) {
            searchObject.filters.alcoholic = [alcoholic];
            filters++;
        }

        if (glass) {
            searchObject.filters.glasses = [glass];
            filters++;
        }


        if (ingredients.length) {
            searchObject.filters.ingredients = ingredients;
            filters += ingredients.length;
        }

        if (search) {
            searchObject.string = search;
            filters++;
        }

        // manage if user submit form with nothing in it
        filters > 0 ? setIsFilterOn(true) : resetFilters()

        setSearchObject({
            ...searchObject
        })
    };

    const resetFilters = () => {
        setIsFilterOn(false);
        setFilteredCocktails([])
    }

    return (
        <>
            <Form className="my-4 mx-2 d-flex flex-column align-items-center" onSubmit={filterCocktails}>
                <Row className="mb-3">
                    <Col xs={12}>
                        <InputGroup>
                            <FloatingLabel label="Par texte">
                                <Form.Control disabled={isLoading} type="text" id="search" name="search"/>
                            </FloatingLabel>
                        </InputGroup>
                    </Col>
                    <Col xs={12}>
                        <InputGroup className="flex-column">
                            <Form.Label htmlFor="category" column="lg">Par catégorie</Form.Label>
                            <Form.Select disabled={isLoading} id="category" name="category" className="w-100">
                                <option value="">---</option>
                                {filters.categories?.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col xs={12}>
                        <InputGroup className="flex-column">
                            <Form.Label htmlFor="alcoholic" column="lg">Alcool ou non</Form.Label>
                            <Form.Select disabled={isLoading} id="alcoholic" name="alcoholic" className="w-100">
                                <option value="">---</option>
                                {filters.alcoholic?.map((al, index) => (
                                    <option key={index} value={al}>
                                        {al}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col xs={12}>
                        <InputGroup className="flex-column">
                            <Form.Label htmlFor="glass" column="lg">Par type de verre</Form.Label>
                            <Form.Select disabled={isLoading} id="glass" name="glass" className="w-100">
                                <option value="">---</option>
                                {filters.glasses?.map((glass, index) => (
                                    <option key={index} value={glass}>
                                        {glass}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col xs={12}>
                        <InputGroup className="flex-column">
                            <Form.Label htmlFor="ingredients" column="lg">Par ingrédients</Form.Label>
                            <Form.Select disabled={isLoading} id="ingredients" name="ingredients" className="w-100 select2" multiple>
                                <option value="">---</option>
                                {filters.ingredients?.map((glass, index) => (
                                    <option key={index} value={glass}>
                                        {glass}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                </Row>
                <ButtonGroup className="gap-3">
                <Button disabled={isLoading} type="submit">Rechercher</Button>
                    <Button disabled={isLoading} type="reset" onClick={resetFilters}>Réinitialiser</Button>
                </ButtonGroup>
            </Form>
        </>
    )
}

export default SearchForm;