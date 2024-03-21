// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import Button from '@mui/material/Button'
import Link from 'next/link'

// ** Types
import { BlankLayoutProps } from './types'


// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))
const Header = () => {
  const theme = useTheme()

  const isDark = theme.palette.mode === 'dark'

  return (
    <AppBar position="static" color="default" elevation={0} sx={{display:'flex', flexDirection:'row', justifyContent:'center', py: '12px!important'}}>
      <Toolbar sx={{ width: '100%', maxWidth: 1300, display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
        <Box>
          <Box
            sx={{
              flexBasis:'0',
              flexGrow:'1',
            }}
            component={Link}
            href='/login'
          >
            <Image
              src={isDark ? '/logo/ai-studio-dark.svg' : '/logo/ai-studio-light.svg'}
              alt='ai-studio'
              width={90}
              height={24}
            />
          </Box>
        </Box>

        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', mt:5, px:4}}>
          <Box sx={{display:'flex', flexDirection:'column', justifyItems:'center', justifyContent:'center'}}>
            <Typography variant="h6" component="div" sx={{color:'#ffffff', px:3, py:'6px', fontSize:14}}>
              Not registered?
            </Typography>
          </Box>
          <Box component={Link} href='/register' ml={4} sx={{display:'flex', flexDirection:'column', justifyItems:'center', justifyContent:'center', px:3, py:'4px'}}>
            <Button
              type='button'
              variant='outlined'
              sx={{
                    color:'#ffffff',
                    border: 2,
                    borderColor:'#513fdc',
                    px:16,
                    fontSize:14,
                    py:4,
                    borderRadius:50,
                    ":hover": {
                      bgcolor: "#513fdc",
                      color: "white",
                      border:'2px solid!important',
                      borderColor:'#513fdc!important'
                    }
              }}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
const BlankLayout = ({ children }: BlankLayoutProps) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <Header />
      <Box className='app-content' sx={{ overflow: 'hidden', minHeight: '100vh', position: 'relative' }}>
        {children}
      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
