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
import {BrowserRouter, Link, Route, Routes, NavLink} from "react-router-dom";
import Cocktails from "./views/Cocktails/Cocktails";
import MyCocktails from "./views/Cocktails/MyCocktails";

function App() {
    const filters = useSelector(state => state.filter.value);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchFilters().then(fetchedFilters => {
            dispatch(initializeFilters(fetchedFilters));
        })
    }, []);

    useEffect(() => {
        if(filters.alcoholic?.length) {
            fetchCocktailsFromFilters("alcoholic", filters.alcoholic).then(fetchedCocktails => {
                dispatch(initializeCocktails(fetchedCocktails));
            })
        }
    }, [filters]);

    return (
        <BrowserRouter>
            <div className="App">
                <header>
                    <Navbar>
                        <Container>
                            <Link className="navbar-brand" to="/">
                                <img src={logo} className="App-logo" width="50" alt="logo"/>
                            </Link>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink role="button" className="nav-link" to="/">Accueil</NavLink>
                                    <NavLink role="button" className="nav-link" to="/cocktails">Cocktails</NavLink>
                                    <NavLink role="button" className="nav-link" to="/my-cocktails">Mes cocktails</NavLink>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<div>Accueil</div>}/>
                        <Route path="/cocktails" element={<Cocktails />}/>
                        <Route path="/cocktails/:id" element={<div>Cocktail id</div>}/>
                        <Route path="/my-cocktails" element={<MyCocktails />}/>
                    </Routes>
                </main>

                <footer>

                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
