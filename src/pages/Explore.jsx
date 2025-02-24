import { useEffect, useState } from "react";
import { getBooks } from "../api/booksApi";
import Header from "../components/Header";

function Explore() {
    const [books, setBooks] = useState([]); // inicializamos como array vacío
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                setBooks(response.data.data.data || []); // suponiendo que la data viene en response.data.data
                // console.log(response)
            } catch (err) {
                setError("Error al cargar los libros");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;
    return (
        <>
            <Header />
            <ul>
                {books.map((book) => (
                    <>
                        {console.log(book.image_url)}
                        <img src={book.image_url} className="w-16 h-16" />
                        <li key={book.id}>{book.title}</li>
                    </>
                ))}
            </ul>
        </>
    );
}

export default Explore;
