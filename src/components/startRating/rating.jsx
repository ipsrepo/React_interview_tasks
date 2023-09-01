import React, { useState } from "react";
import StarRating from './starRating';

const Rating = () => {
    const [rating, setRating] = useState(0);

    function handleRatingChange(rate) {
        setRating(rate);
    }

    return (
        <>
            <StarRating starCount={5} onChange={handleRatingChange} />
            <p>Selected Stars {rating}</p>
        </>
    );
};
export default React.memo(Rating);
