import Link from "next/link";
import { useUser } from "../context/user";

const Nav = () => {
  const { user, isLoading } = useUser();
  return (
    <nav className="flex py-4 px-6 border-b border-gray-200 items-center">
      <Link href="/">
        <a className="hover:border-b">Home</a>
      </Link>
      <Link href="/pricing">
        <a className="ml-5 hover:border-b">Pricing</a>
      </Link>
      {!!user && (
        <Link href="/dashboard">
          <a className="ml-5 hover:border-b">Dashboard</a>
        </Link>
      )}
      {!isLoading && (
        <Link href={user ? '/logout' : '/login'}>
          <a className="ml-auto btn-primary">{user ? 'Logout' : 'Login'}</a>
        </Link>
      )}      
    </nav>
  )
}

export default Nav;