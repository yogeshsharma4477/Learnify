import Landing from '../component/LandingPage'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'

export default function Home({session}) {
  session = JSON.parse(session)
  console.log(session);
  return (
    <>
      <Landing session={session}/>
    </>
  )
}


export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  
  console.log(session,"get server side ");

  // if (!session.data) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }


  return {
    props: {
      session : JSON.stringify(session)
    },
  }
}