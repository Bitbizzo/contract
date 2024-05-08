import { MdHomeFilled } from 'react-icons/md';
import { BsFillCameraReelsFill } from 'react-icons/bs';
import { MdOutlineFileUpload } from 'react-icons/md';
import { PiTelevisionSimpleLight } from 'react-icons/pi';
import { IoRadioSharp } from 'react-icons/io5';

export const sideLinks = [
  {
    name: 'home',
    icon: <MdHomeFilled />,
    url: '',
  },
  {
    name: 'reels',
    icon: <BsFillCameraReelsFill />,
    url: 'reels',
  },
  {
    name: 'uploads',
    icon: <MdOutlineFileUpload />,
    url: 'uploads',
  },
  {
    name: 'tv stations',
    icon: <PiTelevisionSimpleLight />,
    url: 'tv stations'
  },
  {
    name: 'radio stations',
    icon: <IoRadioSharp />,
    url: 'radio stations'
  },
  {
    name: 'liquidity pools',
    url: 'liquidity pools'
  },
];
