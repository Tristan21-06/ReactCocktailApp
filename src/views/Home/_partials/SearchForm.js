import {Button, ButtonGroup, Col, Form, InputGroup, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {handleSearchForm} from "../../../api/Cocktail";

function SearchForm({filteredCocktails, setIsLoading, isLoading, setFilteredCocktails}) {
    const [searchObject, setSearchObject] = useState({});
    const filters = useSelector(state => state.filter.value);

    useEffect(() => {
        document.dispatchEvent(new CustomEvent('react:search-form'))
    }, []);

    useEffect(() => {
        if (searchObject && Object.keys(searchObject).length) {
            handleSearchForm(searchObject)
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

        setIsLoading(true)

        const formData = new FormData(event.target);

        const ingredients = formData.getAll('ingredients');

        let searchObject = {filters: {}};
        let filters = 0;

        if (ingredients.length) {
            searchObject.filters.ingredients = ingredients;
            filters += ingredients.length;
        }

        // manage if user submit form with nothing in it
        if(filters <= 0) {
            resetFilters()
        }

        setSearchObject({
            ...searchObject
        })
    };

    const resetFilters = () => {
        setFilteredCocktails([])
    }

    return (
        <>
            <Form className="my-4 mx-2 d-flex flex-column align-items-center" onSubmit={filterCocktails}>
                <Row className="mb-3">
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