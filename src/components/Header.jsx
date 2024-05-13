// Particle Auth Core
import { useConnect, useEthereum } from '@particle-network/auth-core-modal';
import { useAuthCore } from '@particle-network/auth-core-modal';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromLocalStorage, storeUserInLocalStorage } from '../features/userSlice';

const Header = () => {
  const { connect, connected, disconnect } = useConnect();
  const { userInfo } = useAuthCore()
  const dispatch = useDispatch()
   const user = useSelector((state) => state.userState.user);

  const handleLogin = async () => {
    console.log(connected);
    try {
      if (!connected) {
        const userInfo = await connect();
       dispatch(storeUserInLocalStorage(userInfo))
      }
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };
 function getUser() {
  console.log(userInfo)
  }
  async function logOutUser() {
    await disconnect()
    dispatch(removeUserFromLocalStorage());
  }
  return (
    <header className='flex justify-between px-4 py-6 bg-black items-center container mx-auto'>
      <div>
        <input
          type='text'
          className='py-1 px-4  bg-transparent placeholder:text-sm border border-gray-300 focus:border-[#5C006A] focus:outline-none rounded w-96'
          placeholder='search'
        />
      </div>
      <div>
        <button
          className='bg-white capaitalize p-2 rounded text-xs lg:text-sm text-black'
          onClick={getUser}>
          connect wallet
        </button>
        {user ? (
          <button
            className='bg-white capaitalize p-2 rounded mx-4 w-20 text-xs lg:text-sm text-black'
            onClick={logOutUser}>
            logout
          </button>
        ) : (
          <button
            className='bg-white capaitalize p-2 rounded mx-4 w-20 text-xs lg:text-sm text-black'
            onClick={handleLogin}>
            login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
