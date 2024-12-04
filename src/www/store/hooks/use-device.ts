import { useState, useEffect } from 'react';
import { DeviceWidth, DeviceCodes } from '@/constants/constants';

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

  let deviceType: DeviceCodes = DeviceCodes.MOBILE;
  let generalDeviceType: DeviceCodes = DeviceCodes.MOBILE;

  if (!isClient) {
    return {
      deviceWidth: 0,
      deviceType,
      generalDeviceType,
    };
  }

  if (deviceWidth < DeviceWidth.MOBILE_LARGE) {
    deviceType = DeviceCodes.MOBILE;
    generalDeviceType = DeviceCodes.MOBILE;
  } else if (deviceWidth < DeviceWidth.TABLET) {
    deviceType = DeviceCodes.MOBILE_LARGE;
    generalDeviceType = DeviceCodes.MOBILE;
  } else if (deviceWidth < DeviceWidth.TABLET_LARGE) {
    deviceType = DeviceCodes.TABLET;
    generalDeviceType = DeviceCodes.TABLET;
  } else if (deviceWidth < DeviceWidth.DESKTOP) {
    deviceType = DeviceCodes.TABLET_LARGE;
    generalDeviceType = DeviceCodes.TABLET;
  } else if (deviceWidth < DeviceWidth.DESKTOP_LARGE) {
    deviceType = DeviceCodes.DESKTOP;
    generalDeviceType = DeviceCodes.DESKTOP;
  } else if (deviceWidth < DeviceWidth.FULLSCREEN) {
    deviceType = DeviceCodes.DESKTOP_LARGE;
    generalDeviceType = DeviceCodes.DESKTOP;
  } else if (deviceWidth < DeviceWidth.WIDESCREEN) {
    deviceType = DeviceCodes.FULLSCREEN;
    generalDeviceType = DeviceCodes.DESKTOP;
  } else {
    deviceType = DeviceCodes.WIDESCREEN;
    generalDeviceType = DeviceCodes.DESKTOP;
  }

  return {
    deviceWidth,
    deviceType,
    generalDeviceType,
  };
}
