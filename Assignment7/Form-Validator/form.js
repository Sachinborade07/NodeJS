function validateForm(data) {
    const errors = {};
    const perfectData = {};

    // Name 
    if (!data.name || data.name.trim() === '') {
        errors.name = "Name is required";
    } else {
        perfectData.name = data.name.trim();
    }

    // Email 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || data.email.trim() === '') {
        errors.email = "Email is required";
    } else if (!emailPattern.test(data.email)) {
        errors.email = "Invalid email format";
    } else {
        perfectData.email = data.email.trim();
    }

    // Age must be over 18
    if (typeof data.age !== 'number' || data.age <= 18) {
        errors.age = "Age must be over 18";
    } else {
        perfectData.age = data.age;
    }

    return Object.keys(errors).length === 0
        ? { status: "Valid", data: perfectData }
        : { status: "Invalid", errors };
}


// const formData = { name: "John", email: "Sachin195@example.com", age: 21 };
const formData = { name: "", email: "alskdjf" };
console.log(validateForm(formData));
