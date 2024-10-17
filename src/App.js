import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch, useSelector} from "react-redux";
import {initializeFilters} from "./features/filter/FilterSlice";
import {useEffect} from "react";
import {fetchFilters} from "./api/Filter";
import {fetchCocktailsFromFilters} from "./api/Cocktail";
import {initializeCocktails} from "./features/cocktail/CocktailSlice";
import {Container, Nav, Navbar} from "react-bootstrap";

function App({children}) {
    const filters = useSelector(state => state.filter.value);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('useEffect filters')
        fetchFilters().then(fetchedFilters => {
            dispatch(initializeFilters(fetchedFilters));
        })
    }, []);

    useEffect(() => {
        if(filters.alcoholic?.length) {
            console.log('useEffect cocktails', filters)
            fetchCocktailsFromFilters("alcoholic", filters.alcoholic).then(fetchedCocktails => {
                dispatch(initializeCocktails(fetchedCocktails));
            })
        }
    }, [filters])

    return (
        <div className="App">
            <header>
                <Navbar>
                    <Container>
                        <Navbar.Brand href="/"><img src={logo} className="App-logo" width="50" alt="logo"/></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Accueil</Nav.Link>
                                <Nav.Link href="/cocktails">Cocktails</Nav.Link>
                                <Nav.Link href="/my-cocktails">Mes cocktails</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>

            <main>
                {children}
            </main>

            <footer>

            </footer>
        </div>
    );
}

export default App;
