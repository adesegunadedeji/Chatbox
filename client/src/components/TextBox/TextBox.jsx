import React from 'react'
import{IoIosBody} from "react-icons/io";

const TextBox = ({users}) => (

    <div className="textContainer"> 

    {
        users ?  // If users exists Put them into this box
        (
           <div>
           <h6>Chat Room:</h6>
           <div className="activeContainer">
             <h4>{
                users.map(({name}) => (
                    <div key={name} className="activeItem"> 
                        <IoIosBody/> 
                        {name}
                    </div>
                ))} 
                    </h4>
            </div></div>
        )

        : null //Otherwise do nothing
    }

    </div>


)

export default TextBox