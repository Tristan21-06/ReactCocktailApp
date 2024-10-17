import axios from 'axios';
const filterBaseUrl = new URL("https://www.thecocktaildb.com/api/json/v1/1/list.php");

export const filterTypes = {
    alcoholic: "a",
    catergories: "c",
    glasses: "g",
    ingredients: "i",
};

export const fetchFilters = async () => {
    let filters = {};
    for (const filterType of Object.keys(filterTypes)) {
        let data = await fetchFilter(filterTypes[filterType]);

        if (!data) {
            continue;
        }

        filters[filterType] = data.drinks.map(
            filterValue =>
                Object.values(filterValue)[0]
        );
    }

    return filters;
}

export const fetchFilter = (type) => {
    const alcoholicUrl = new URL(filterBaseUrl.href);
    alcoholicUrl.searchParams.append(type, "list");

    return axios.get(alcoholicUrl.href)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            console.error(error);
        })
    ;
}
