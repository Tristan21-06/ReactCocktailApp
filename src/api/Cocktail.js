import axios from "axios";
import {filterTypes} from "./Filter";
import {countOcurrences, removeDuplicates} from "../utils/cocktails";

const filterCocktailBaseURL = new URL("https://www.thecocktaildb.com/api/json/v1/1/filter.php")

export const fetchCocktailsFromFilters = async (filterType, filters) => {
    let cocktails = [];
    for (const filter of filters) {
        try {
            let data = await fetchCocktailsByFilter(filterTypes[filterType], filter);

            if (!data) {
                continue;
            }

            cocktails = [
                ...cocktails,
                ...data.filter(newCocktail => !cocktails.includes(newCocktail))
            ];
        } catch (e) {
            console.error(e);
        }
    }

    return cocktails;
}

const fetchCocktailsByFilter = (type, filter) => {
    const cocktailsByFilterUrl = new URL(filterCocktailBaseURL.href);
    cocktailsByFilterUrl.searchParams.append(type, filter);

    return axios.get(cocktailsByFilterUrl.href)
        .then(res => {
            if (!res.data?.drinks)
                return false;

            return res.data.drinks;
        })
        .catch(error => {
            console.error(error);
        })
        ;
}

export const fetchCocktailsBySearch = (searchString) => {
    const cocktailsBySearchUrl = new URL("https://www.thecocktaildb.com/api/json/v1/1/search.php");
    cocktailsBySearchUrl.searchParams.append("s", searchString);

    return axios.get(cocktailsBySearchUrl.href)
        .then(res => {
            if (!res.data?.drinks)
                return false;

            return res.data.drinks;
        })
        .catch(error => {
            console.error(error);
        })
        ;
}

export const handleSearchForm = async (search, myCocktails = null) => {
    const filters = search.filters;
    const searchString = search.string;

    let allCocktails = [];
    let nbFilter = 0;


    if (filters) {
        for (const filterType of Object.keys(filters)) {
            let drinks = await fetchCocktailsFromFilters(filterType, filters[filterType]);

            allCocktails = [
                ...allCocktails,
                ...drinks,
            ];

            nbFilter += filters[filterType].length;
        }
    }

    if (searchString) {
        let drinks = await fetchCocktailsBySearch(searchString);

        allCocktails = [
            ...allCocktails,
            ...drinks,
        ]

        nbFilter++;
    }

    let mappedMyCocktails = myCocktails?.map(cocktail => cocktail.idDrink);

    const filteredCocktails = allCocktails
        .filter(
            cocktail =>
                countOcurrences(cocktail, allCocktails) === nbFilter && (!mappedMyCocktails || mappedMyCocktails.includes(cocktail.idDrink))
        )
        .map(cocktail => {
            return {
                idDrink: cocktail.idDrink,
                strDrink: cocktail.strDrink,
                strDrinkThumb: cocktail.strDrinkThumb
            };
        })
    ;

    return removeDuplicates(filteredCocktails);
}

export const fetchSingleCocktail = (id) => {
    const cocktailsByIdUrl = new URL("https://www.thecocktaildb.com/api/json/v1/1/lookup.php");
    cocktailsByIdUrl.searchParams.append("i", id);

    return axios.get(cocktailsByIdUrl.href)
        .then(res => {
            if (!res.data?.drinks?.length)
                return false;

            return res.data.drinks[0];
        })
        .catch(error => {
            console.error(error);
        })
        ;
}

export const fetchRandomCocktail = () => {
    const randomCocktailUrl = new URL("https://www.thecocktaildb.com/api/json/v1/1/random.php");

    return axios.get(randomCocktailUrl.href)
        .then(res => {
            if (!res.data?.drinks?.length)
                return false;

            return res.data.drinks[0];
        })
        .catch(error => {
            console.error(error);
        })
        ;
}