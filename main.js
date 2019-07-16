function destr(obj, arr = []) {
    for (key in obj) {
        if (obj[key] === null) {
            arr.push(null)
        } else if (Array.isArray(obj[key])) {
            arr = arr.concat(obj[key]);
        } else if (typeof obj[key] === "object" ) {
            destr(obj[key], arr)
        } else {
            arr.push(obj[key]);
        }
    }
    
    return arr;
}

let obj = {
    name: "Vasya",
    address: {
        country: 'Belarus',
        city: "Minsk",
    },
    phone: null,
    friends: [ "Petya", "Kolya", "Sveta" ]
};


console.log(destr(obj));