// Particle Auth Core
import { useConnect } from '@particle-network/auth-core-modal';



const Header = () => {
 const { connect, connected } = useConnect();

 // Event handler for button click
 const handleConnect = async () => {
   try {
     // Call the connect function and get user information
     const userInfo = await connect();
     console.log('User info:', userInfo);
   } catch (error) {
     console.error('Error connecting:', error);
   }
 };
  

  return (
    <header className='flex justify-between px-4 py-6 bg-black items-center container mx-auto'>
      <div>
        <input
          type='text'
          className='lg:p-1  bg-transparent placeholder:text-sm border border-gray-300 focus:border-[#5C006A] focus:outline-none rounded w-96'
          placeholder='search'
        />
      </div>
      <div>
        <button className='bg-white capaitalize p-2 rounded text-xs lg:text-sm'>
          connect wallet
        </button>
        <button className='bg-white capaitalize p-2 rounded mx-4 w-20 text-xs lg:text-sm' onClick={handleConnect}>
          login
        </button>
        <button className='bg-[#5C006A] capaitalize p-2 rounded w-20 text-white text-xs lg:text-sm'>
          sign up
        </button>
      </div>
    </header>
  );
};

export default Header;
