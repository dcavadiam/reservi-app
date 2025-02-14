export async function fetchRandomUsers() {
    const response = await fetch('https://randomuser.me/api/?results=10');
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data.results;
}