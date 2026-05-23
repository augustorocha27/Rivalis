import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import { spacing } from './index';

export const breakpoints = {
  phone: 600,
  tablet: 900,
  desktop: 1180,
};

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const isPhone = width < breakpoints.phone;
    const isMobile = width < breakpoints.tablet;
    const isTablet = width >= breakpoints.tablet && width < breakpoints.desktop;
    const isDesktop = width >= breakpoints.desktop;

    return {
      width,
      height,
      isPhone,
      isMobile,
      isTablet,
      isDesktop,
      pagePadding: isPhone ? spacing.md : isMobile ? spacing.lg : spacing.xxl,
      cardPadding: isPhone ? spacing.lg : spacing.xl,
      sectionGap: isPhone ? spacing.xl : spacing.huge,
      contentMaxWidth: 1180,
    };
  }, [width, height]);
}