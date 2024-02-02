import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useFetchCourses from '@/customHooks/useFetchCourses';
import CourseCard from './CourseCard';
import Grid from '@mui/material/Grid';
import { signIn, useSession, signOut } from 'next-auth/react';

export default function Courses({session}) {
    // const session = useSession();
    // console.log(session, "session");

    let coursesList = useFetchCourses();

    // if (session) {
    //     return (
    //         <>
    //             Signed in as {session?.user?.email} <br />
    //             <button onClick={() => signOut()}>Sign out</button>
    //         </>
    //     )
    //     }

    return (
        <>

            {/* Not signed in <br />
            <button onClick={() => signIn('google', { redirect: false })}>Sign in</button> */}

                    
            <Box sx={{ display: 'flex', flexWrap: 'wrap', bgcolor: '#f7f9fa', height: '100vh' }} spacing={2} >
                {
                    coursesList.map(({ _id, title, description, price, imageLink }) => {
                        return (
                            <div key={_id} >
                                <CourseCard
                                    title={title}
                                    description={description}
                                    price={price}
                                    imageLink={imageLink}
                                />
                            </div>
                        )
                    })
                }
            </Box>
        </>
    );
}