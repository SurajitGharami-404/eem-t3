
import { Role } from "@prisma/client";
import { type GetServerSidePropsContext} from "next";
import { getServerAuthSession } from "~/server/auth";

export const getServerSideProps = async(ctx:GetServerSidePropsContext)=>{
  const session = await getServerAuthSession(ctx)

  if(!session){
    return{
      redirect:{
        destination:"/auth/login",
        permanent:false
      }
    } 
  }

  if(session?.user.role===Role.SUPER_ADMIN){
    return{
      redirect:{
        destination:"/super-admin/dashboard",
        permanent:false
      }
    }
  }
  if(session?.user.role===Role.SCHOOL_ADMIN){
    return{
      redirect:{
        destination:"/school-admin/dashboard",
        permanent:false
      }
    }
  }
  if(session?.user.role===Role.TEACHER){
    return{
      redirect:{
        destination:"/teacher/dashboard",
        permanent:false
      }
    }
  }



  return {
    props:{
      session
    }
  }
}



export default function Home() {

  return null
}
