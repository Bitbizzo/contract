import { NavLink } from 'react-router-dom';
import phVideo from '../assets/ph_video-thin.png';
import { sideLinks } from '../data';

const SideBar = () => {
  return (
    <aside className='bg-black py-4 px-2 lg:w-1/5 h-screen flex flex-col items-center'>
      <h1 className='space-mono-bold text-[#5C006A] mb-4 flex items-center'>
        <img src={phVideo} alt='tv' />
        BitBuzz
      </h1>
      <ul>
        {sideLinks.map(({ name, icon , url}) => {
          return (
            <li key={name} className='m-4 text-sm'>
              <NavLink
                to={url}
                className='text-white capitalize flex items-center'>
                <div className='mr-4'>
                  {icon}
                </div>
                
                {name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideBar;
