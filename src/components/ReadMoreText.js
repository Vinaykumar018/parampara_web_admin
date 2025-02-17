import React,{useState} from "react";
import { Link } from "react-router-dom";
const ReadMoreText = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div>
            <p>
                {isExpanded ? text : text.slice(0, 200) + (text.length > 200 ? "..." : "")}
            &nbsp;
            {text.length > 200 && (
                <Link onClick={() => setIsExpanded(!isExpanded)} style={{color:"blue"}}>
                    {isExpanded ? "Read Less" : "Read More"}
                </Link>
            )}
            </p>
        </div>
    );
}
export default ReadMoreText;