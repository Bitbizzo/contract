import React from 'react';
import { axiosInstance } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const fetchGenres = async () => {
  const response = await axiosInstance.get('genre/movie/list', {
    params: {
      language: 'en-US',
    },
  });
  return response.data; // Return the data from the response
};

function getFirstWord(str) {
  const words = str.split(' ');
  return words[0];
}

const Categories = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
  });
 
  return (
    <section className='text-black'>
      {isLoading && 'loading categories'}
      <div className='flex overflow-x-scroll'>
        <a className='bg-white p-2 m-2 text-xs text-center rounded-md cursor-pointer'>
          All
        </a>
        {data &&
          data.genres.map(({ id, name }) => {
            return (
              <a
                key={id}
                className='bg-white p-2 m-2 text-xs text-center rounded-md cursor-pointer'>
                {getFirstWord(name)}
              </a>
            );
          })}
      </div>
    </section>
  );
};

export default Categories;
