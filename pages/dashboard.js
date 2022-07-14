import { supabase } from "../utils/supabase";
import { useUser } from "../context/user";
import axios from "axios";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const loadPortal = async () => {
    const { data } = await axios.get('/api/portal');
    router.push(data.url);
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">Dashboard</h1>
      {!isLoading && (
        <>
          <p>
            {user?.is_subscribed ? `Subscribed: ${user.interval}` : `Not subscribed`}
          </p>
          <button className="btn-primary mt-6" onClick={loadPortal}>Manage subscription</button>
        </>  
      )}      
    </div>
  )
}

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        redirect: '/login'
      },
      props: {}
    }
  }

  return {
    props: {}
  }
}

export default Dashboard;