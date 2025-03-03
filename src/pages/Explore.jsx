import { useEffect, useState } from "react";
import { getBooks } from "../api/booksApi";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function Explore() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                setBooks(response.data.data || []);
            } catch (err) {
                setError("Error al cargar los libros");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <>
            <Header />
            <div className="mx-auto p-6">
                <h1 className="text-3xl font-bold text-white mb-6">Explore eBooks</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="bg-neutral-700 cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                        >
                            <img
                                src={book.image_url}
                                alt={book.title}
                                className="w-full h-64 object-cover rounded-t-lg"
                                onError={(e) => (e.target.src = '/default-book-cover.jpg')}
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-300 line-clamp-2">{book.title}</h2>
                                {book.user && (
                                    <p className="text-gray-400 text-sm mb-4">Por {book.user.name}</p>
                                )}
                                <Link to={`/explore/${book.id}`} className="mt-4 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
                                    Ver más
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                {books.length === 0 && (
                    <p className="text-center text-gray-500 py-10">No se encontraron libros.</p>
                )}
            </div>
        </>
    );
}

export default Explore;
