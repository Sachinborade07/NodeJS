function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldFail = Math.random() < 0.3; // 30% chance to fail
            if (shouldFail) {
                reject(new Error(' Failed to fetchuser data'));
            } else {
                resolve({
                    id: userId,
                    name: 'Sachin',
                    email: 'sachinborade@example.com'
                });
            }
        }, 2000);
    });
}

async function getUserData(userId) {
    try {
        const user = await fetchUserData(userId);
        console.log('User fetched successfully:', user);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

getUserData(1);
