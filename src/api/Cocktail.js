import axios from "axios";
import {filterTypes} from "./Filter";

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
                ...data.drinks.filter(newCocktail => !cocktails.includes(newCocktail))
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
            return res.data;
        })
        .catch(error => {
            console.error(error);
        })
        ;
}