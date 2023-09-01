import React, { useState, useEffect } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

//<AiOutlineStar/>
//<AiFillStar/>

export default function StarRating({ starCount, onChange }) {
    const [rating, setRating] = useState(0);
    const [starsEle, setStarsEle] = useState();

    const handleClick = (newRating) => {
        setRating(newRating);
        onChange(newRating);
    };

    useEffect(() => {
        const startElement = Array.from({ length: starCount }, (_, i) => i + 1).map(
            (star) => (
                <span
                    className="h-5 w-5 cursor-pointer text-primary mr-2"
                    key={star}
                    onClick={() => handleClick(star)}
                >
          {rating >= star ? '<AiOutlineStar /> : <AiFillStar />'}
        </span>
            )
        );
        setStarsEle(startElement);
    }, [rating]);

    return <div className="flex">{starsEle}</div>;
}
