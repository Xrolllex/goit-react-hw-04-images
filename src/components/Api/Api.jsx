export default async function getImages(inputValue, page = 1) {
    const url = 'https://pixabay.com/api/';
    const API_KEY = '40029898-1d411868c635d026eac66d85b';

    try {
        const response = await fetch(`${url}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error('Błąd podczas pobierania danych z Pixabay:', error);
        throw error;
    }
}
