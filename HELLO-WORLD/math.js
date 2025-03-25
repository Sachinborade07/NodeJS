function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

// 1. This is more preferable way to export an module  
// module.exports = "Sachin";
// module.exports = {
//     addF: add,
//     subF: sub,
// }

// This is an alternative to above

// export const addF = add;
// export const subF = sub;


// exports.add = (a, b) => a + b;
// exports.sub = (a, b) => a - b;

// this is an alternative to above 

const _add = (a, b) => a + b;
export { _add as add };

const _sub = (a, b) => a - b;
export { _sub as sub };
