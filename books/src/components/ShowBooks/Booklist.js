import React from "react";
import { useGlobalContext } from "../../App";
import Books from "../ShowBooks/Books"
import "../ShowBooks/Booklist.css"
import coverImg from "../../images/cover_not_found.jpg";
import Loading from "../Loader/Loader";

const Booklist = () => {
    const { books, loading, resultTitle } = useGlobalContext();
    const booksWithCovers = books.map(singlebook => {
        return {
            ...singlebook,
            id: (singlebook.id).replace("/works/", ""),
            cover_img: singlebook.cover_id ? `https://covers.openlibrary.org/b/id/${singlebook.cover_id}-L.jpg` : coverImg
        }
    });

    if (loading) return <Loading />;

    return (
        <section className='booklist'>
            <div className='container'>
                <div className='section-title'>
                    <h2>{resultTitle}</h2>
                </div>
                <div className='booklist-content grid'>
                    {
                        booksWithCovers.slice(0, 30).map((item, index) => {
                            return (
                                <Books key={index} {...item} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
export default Booklist;