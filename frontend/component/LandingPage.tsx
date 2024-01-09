import React from "react";
import Courses from "./Courses";

function Landing({session}) {
    return (
        <>
            <Courses session={session}/>
        </>
    )
}

export default Landing