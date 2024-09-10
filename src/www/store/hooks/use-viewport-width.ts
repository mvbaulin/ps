import { useState, useEffect } from 'react';
import { DEVICE_WIDTH, DEVICE_CODES } from '@/constants/device-width';

export default function useDeviceInfo() {
  const [isClient, setIsClient] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState<number>(0);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setDeviceWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let deviceType: string = DEVICE_CODES.MOBILE;

  if (!isClient) {
    return {
      deviceWidth: 0,
      deviceType,
    };
  }

  if (deviceWidth < DEVICE_WIDTH.MOBILE_LARGE) {
    deviceType = DEVICE_CODES.MOBILE;
  } else if (deviceWidth < DEVICE_WIDTH.TABLET) {
    deviceType = DEVICE_CODES.MOBILE_LARGE;
  } else if (deviceWidth < DEVICE_WIDTH.TABLET_LARGE) {
    deviceType = DEVICE_CODES.TABLET;
  } else if (deviceWidth < DEVICE_WIDTH.DESKTOP) {
    deviceType = DEVICE_CODES.TABLET_LARGE;
  } else if (deviceWidth < DEVICE_WIDTH.DESKTOP_LARGE) {
    deviceType = DEVICE_CODES.DESKTOP;
  } else if (deviceWidth < DEVICE_WIDTH.FULLSCREEN) {
    deviceType = DEVICE_CODES.DESKTOP_LARGE;
  } else if (deviceWidth < DEVICE_WIDTH.WIDESCREEN) {
    deviceType = DEVICE_CODES.FULLSCREEN;
  } else {
    deviceType = DEVICE_CODES.WIDESCREEN;
  }

  return {
    deviceWidth,
    deviceType,
  };
}
