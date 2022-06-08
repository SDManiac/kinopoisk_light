const API_KEY = 'e0b8ee73-8e36-4d46-9651-177fdcb541a8';

/**
 * 
 * @param {string} url 
 */
 export async function getData(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY
        }
    }).catch((err) => {
        console.error('Could not fetch', err)
    });
    if (!resp.ok) {
        throw new  Error(`Could not fetch ${url}` + `, received ${resp.status}`)
    }
    return await resp.json();
}