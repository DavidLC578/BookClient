import { useParams } from 'react-router-dom';
import Header from '../components/Header'
import { useEffect, useState } from 'react';
import { getBook } from '../api/booksApi';
function BookPage() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [book, setBook] = useState()

    useEffect(() => {
        const fetchBook = async (id) => {
            try {
                const response = await getBook(id);
                console.log(response.data.book)
                setBook(response.data.book)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchBook(id)
    }, [id])
    return (
        <>
            <Header />
            {
                book && !loading ?
                    <div className="min-h-[calc(100vh-80px)] flex flex-col p-6">
                        {/* Book Title - Centered horizontally at the top */}
                        <h1 className="text-4xl font-bold text-gray-200 mb-8 text-center">
                            {book.title}
                        </h1>

                        {/* Centered Container for Image and Synopsis */}
                        <div className="flex-1 flex flex-col md:flex-row items-start justify-center gap-8 max-w-6xl mx-auto p-4">
                            {/* Book Cover Image */}
                            <div className="flex justify-center">
                                <img
                                    src={book.image_url}
                                    alt={`${book.title} cover`}
                                    className="md:w-[400px] md:h-[500px] object-cover rounded-lg shadow-2xl transform transition duration-500 hover:scale-105"
                                />
                            </div>

                            {/* Synopsis */}
                            <div className=" max-w-[700px] bg-neutral-900 px-8 py-6 rounded-lg shadow-2xl">
                                <h2 className="text-2xl font-semibold text-gray-200 mb-4">
                                    Synopsis
                                </h2>
                                <p className="text-gray-300 leading-relaxed">
                                    {book.synopsis}
                                </p>
                            </div>
                        </div>
                    </div>
                    :
                    <p>Loading...</p>
            }
        </>
    )
}

export default BookPage;