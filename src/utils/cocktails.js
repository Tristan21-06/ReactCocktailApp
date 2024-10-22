export const countOcurrences = (search, array) => {
    let count = 0;
    array.forEach(el => {
        if (el.idDrink === search.idDrink) {
            count++;
        }
    })

    return count;
}

export const removeDuplicates = (array) => {
    return array.reduce((a, b) => {
        let tmp = a.map(el => el.idDrink);
        if (tmp.indexOf(b.idDrink) < 0) a.push(b);
        return a;
    }, []);
}