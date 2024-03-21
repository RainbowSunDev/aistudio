// ** React Imports
import Box from '@mui/material/Box'

const AuthLayout = ({ children }: React.PropsWithChildren<{}>) => {

  return (
    <Box
      className='content-right'
      sx={{
        backgroundColor: theme => (theme.palette.mode === 'dark' ? '#191932' : '#F5F6FB'),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'

      }}
    >
      {children}
      {/* {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '10px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8),
            backgroundImage: `url(/login/banner.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></Box>
      ) : null} */}
    </Box>
  )
}

export default AuthLayout
