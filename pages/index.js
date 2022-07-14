import Link from 'next/link';
import { supabase } from '../utils/supabase';
import { useUser } from '../context/user';

export default function Home({ lessons }) {    
  const { user } = useUser();
  console.log({ user });
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      {lessons.map(lesson => (
        <Link key={lesson.id} href={`/${lesson.id}`}>
          <a className='p-8 h-40 mb-4 rounded shadow flex flex-col hover:bg-gray-100'>
            <h2 className='text-xl'>{lesson.title}</h2>
            <p className='mt-4 text-gray-500'>{lesson.description}</p>
          </a>          
        </Link>
      ))}
    </div>      
  )
}

export const getStaticProps = async () => {
  const { data: lessons } = await supabase.from('lesson').select('*');

  return {
    props: {
      lessons
    }
  }  
}