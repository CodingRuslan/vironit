let arr = [];

function destr(obj) {
    for (key in obj) {
        if (obj[key] === null) {
            arr.push(null)
        } else if (Array.isArray(obj[key])) {
            arr = arr.concat(obj[key]);
        } else if (typeof obj[key] === "object" ) {
            for (newKey in obj[key]) {
                arr.push(obj[key][newKey])
            }
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