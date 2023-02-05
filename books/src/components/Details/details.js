import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loader/Loader"
import coverimage from "../../images/cover_not_found.jpg";
import "../Details/details.css"
import { useNavigate } from "react-router-dom";
import { FaArrowLeft} from 'react-icons/fa'
const URL = "https://openlibrary.org/works/"

const Details = () => {
    const { id } = useParams();
    const [ loading, setloading ] = useState(false);
    const [book, setbook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setloading(true);
        async function getDetails() {
            try {
                const response = await fetch(`${URL}${id}.json`);
                const data = await response.json();
                console.log(data);
                if (data) {
                    const { description, title, covers, subject_places, subject_times, subjects } = data;
                    const newBook = {
                        description: description ? description.value : "No description found",
                        title: title,
                        cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverimage,
                        subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
                        subject_times: subject_times ? subject_times.join(", ") : "No subject times found",
                        subjects: subjects ? subjects.join(", ") : "No subjects found"
                    };
                    setbook(newBook);
                }
                else {
                    setbook(null);
                }
                setloading(false);
            }
            catch (error) {
                console.log(error);
                setloading(false);
            }
        }
        getDetails();

    }, [id]);

    if (loading) return <Loading />;
    return (
        <section className="book-details">
            <div className="container">
                <button type="button" className="flex flex-c back-btn" onClick={() => navigate("/book")}>
                    <FaArrowLeft size={22} />
                    <span className='fs-18 fw-6'>Go Back</span>
                </button>
                <div className="book-details-content grid">
                    <div className="book-details-img">
                        <img src={book?.cover_img} alt="cover img" />
                    </div>
                    <div className="book-details-info">
                        <div className="book-details-item title">
                            <span className="fw-6 fs-24">{book?.title}</span>
                        </div>
                        <div className='book-details-item description'>
                            <span>{book?.description}</span>
                        </div>
                        <div className='book-details-item'>
                            <span className='fw-6'>Subject Places: </span>
                            <span className='text-italic'>{book?.subject_places}</span>
                        </div>
                        <div className='book-details-item'>
                            <span className='fw-6'>Subject Times: </span>
                            <span className='text-italic'>{book?.subject_times}</span>
                        </div>
                        <div className='book-details-item'>
                            <span className='fw-6'>Subjects: </span>
                            <span>{book?.subjects}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Details;