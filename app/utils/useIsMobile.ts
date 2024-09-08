import { useMediaQuery, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export function useIsMobile(): boolean {
  const theme: Theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(840));
}