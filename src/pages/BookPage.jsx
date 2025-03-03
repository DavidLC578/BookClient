import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { deleteBook, downloadBook, getBook } from '../api/booksApi';
import { useAuth } from '../context/AuthContext';

function BookPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState();
    const { user, isAuthenticated } = useAuth();
    const [error, setError] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async (id) => {
            try {
                const response = await getBook(id);
                setBook(response.data.book);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook(id);
    }, [id]);

    const handleDownload = async (id) => {
        try {
            const response = await downloadBook(id);

            // Create a URL object for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create an invisible <a> link and simulate a click
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `book_${book.title}.pdf`); // File name
            document.body.appendChild(link);
            link.click();

            // Clean up the URL object
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);

        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await deleteBook(id);
            if (response.status === 200) {
                navigate('/explore');
            }
        } catch (error) {
            console.error(error)
            setError(error.response.data.message)
        }
    }

    return (
        <>
            <Header />
            {book && !loading ? (
                <div className="min-h-[calc(100vh-80px)] flex flex-col p-6">
                    <div className="flex-1 flex flex-col md:flex-row items-start justify-center gap-8 max-w-6xl mx-auto">
                        {/* Text container - appears FIRST on mobile */}
                        <div className="flex-1 md:order-2"> {/* Change here */}
                            {/* Title and button */}
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-4xl font-bold text-gray-200">{book.title}</h1>
                                <div className='flex gap-x-4'>
                                    <button onClick={() => handleDownload(id)} className="bg-indigo-600 text-white cursor-pointer px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
                                        Download
                                    </button>
                                    {isAuthenticated && book.user_id === user.id &&
                                        (
                                            <button onClick={() => handleDelete(id)} className="bg-red-600 text-white cursor-pointer px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300">
                                                Delete
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                            {error && <p className='mb-4 text-red-500 text-end text-lg font-semibold'>{error}</p>}
                            {/* Synopsis */}
                            <div className="bg-neutral-900 px-8 py-6 rounded-lg shadow-2xl">
                                <h2 className="text-2xl font-semibold text-gray-200 mb-4">Synopsis</h2>
                                <p className="text-gray-300 leading-relaxed">{book.synopsis}</p>
                            </div>
                        </div>

                        {/* Image - appears SECOND on mobile */}
                        <div className="flex justify-center md:w-1/3 md:order-1"> {/* Change here */}
                            <img
                                src={book.image_url}
                                alt={`${book.title} cover`}
                                className="w-full max-w-[400px] h-96 object-cover rounded-lg shadow-2xl transform transition duration-500 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default BookPage;
