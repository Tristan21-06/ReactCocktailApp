import {Button, ButtonGroup, Col, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {handleSearchForm} from "../../api/Cocktail";

function SearchForm({setFilteredCocktails, setIsFilterOn, myCocktails = null}) {
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

    const filterCocktails = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const category = formData.get('category');
        const alcoholic = formData.get('alcoholic');
        const glass = formData.get('glass');
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

        if (search) {
            searchObject.string = search;
            filters++;
        }

        if (filters > 0) {
            setIsFilterOn(true);
        } else {
            resetFilters();
        }

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
            <Form className="w-75 my-4 mx-2" onSubmit={(event) => filterCocktails(event)}>
                <Row className="mb-3">
                    <Col xs={12}>
                        <InputGroup>
                            <FloatingLabel label="Par texte">
                                <Form.Control type="text" id="search" name="search" />
                            </FloatingLabel>
                        </InputGroup>
                    </Col>
                    <Col lg={4}>
                        <InputGroup className="flex-column">
                            <Form.Label htmlFor="category" column="lg">Par catégorie</Form.Label>
                            <Form.Select id="category" name="category" className="w-100">
                                <option value="">---</option>
                                {filters.categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col lg={4}>
                        <InputGroup className="flex-column">
                            <Form.Label htmlFor="alcoholic" column="lg">Alcool ou non</Form.Label>
                            <Form.Select id="alcoholic" name="alcoholic" className="w-100">
                                <option value="">---</option>
                                {filters.alcoholic.map((al, index) => (
                                    <option key={index} value={al}>
                                        {al}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col lg={4}>
                        <InputGroup className="flex-column">
                            <Form.Label htmlFor="glass" column="lg">Par type de verre</Form.Label>
                            <Form.Select id="glass" name="glass" className="w-100">
                                <option value="">---</option>
                                {filters.glasses.map((glass, index) => (
                                    <option key={index} value={glass}>
                                        {glass}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>
                    </Col>
                </Row>
                <ButtonGroup className="gap-3">
                    <Button type="submit">Rechercher</Button>
                    <Button type="reset" onClick={resetFilters}>Réinitialiser</Button>
                </ButtonGroup>
            </Form>
        </>
    )
}

export default SearchForm;