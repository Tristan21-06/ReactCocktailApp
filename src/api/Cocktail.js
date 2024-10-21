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

export const handleSearchForm = async (search, myCocktails) => {
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

            nbFilter++;
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
        .filter(cocktail =>
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