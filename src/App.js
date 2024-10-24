import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch} from "react-redux";
import {initializeFilters} from "./features/filter/FilterSlice";
import {useEffect} from "react";
import {fetchFilters} from "./api/Filter";
import {Container, Nav, Navbar} from "react-bootstrap";
import {BrowserRouter, Link, Route, Routes, NavLink} from "react-router-dom";
import Cocktails from "./views/Cocktails/Cocktails";
import MyCocktails from "./views/Cocktails/MyCocktails";
import CocktailDetails from "./views/Cocktails/CocktailDetails";
import Home from "./views/Home/Home";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchFilters().then(fetchedFilters => {
            dispatch(initializeFilters(fetchedFilters));
        })
    }, []);

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
                        <Route path="/" element={<Home />}/>
                        <Route path="/cocktails" element={<Cocktails />}/>
                        <Route path="/cocktails/:id" element={<CocktailDetails />}/>
                        <Route path="/my-cocktails" element={<MyCocktails />}/>
                    </Routes>
                </main>

                <footer className="p-5">
                    <p className="text-center">
                        ITAkademy &copy; Tristan JACQUEMARD
                    </p>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
