export const countOcurrences = (search, array) => {
    let count = 0;
    array.forEach(el => {
        if (el.idDrink === search.idDrink) {
            count++;
            if(count === 2) {
                console.log(search)
            }
        }
    })

    return count;
}

export const removeDuplicates = (array) => {
    let tmp = array.map(el => el.idDrink);
    return array.reduce((a, b) => {
        if (tmp.indexOf(b.idDrink) < 0) a.push(b);
        return a;
    }, []);
}