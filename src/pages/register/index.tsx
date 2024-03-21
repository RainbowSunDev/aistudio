// ** React Imports
import { ReactNode, useState, MouseEvent } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { yupResolver } from '@hookform/resolvers/yup'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import * as yup from 'yup'
import { useAuth } from 'src/hooks/useAuth'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks

// ** Demo Imports
import AuthLayout from 'src/layouts/auth'
import { useForm, Controller } from 'react-hook-form'

// ** Styled Components
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.common.white} !important`,
  ":hover": {
    color: "#9c8ffd!important"
  },
  transition: 'all!important'
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.common.white
  }
}))
interface FormData {
  name: string;
  email: string;
  phone_number: number; // or string if you're not expecting a purely numerical phone number
  password: string;
  confirm_password: string;
}
const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  phone_number: yup.number().required(),
  password: yup.string().min(5).required(),
  confirm_password: yup.string().min(5).required()
})


const defaultValues = {
  name: '',
  email: '',
  phone_number: NaN,
  password: '',
  confirm_password: ''
}

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(true)

  // ** Hooks
  // const theme = useTheme()

  const auth = useAuth()

  const { control, setError, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: FormData) => {
    const { email, password } = data;

    auth.login({ email, password, rememberMe }, () => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

  // const isDark = theme.palette.mode === 'dark'

  return (
    <AuthLayout>
      {/* <RightWrapper> */}
      <Box
        sx={{
          mt: 12,
          width: '100%',
          maxWidth: '1300px',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 425 }}>
          <Box sx={{ mb: '10%' }}>
            <Typography variant='h1' sx={{ mb: 1.5, color: '#ffffff', fontSize: 48, fontWeight: 500, letterSpacing: -0.75, lineHeight: '56px' }}>
              Create a new
              <br />
              account
            </Typography>
          </Box>

          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 6 }}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    autoFocus
                    label='Name'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Type name here'
                    error={Boolean(errors.email)}
                    {...(errors.name && { helperText: errors.name.message })}
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: 6 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    autoFocus
                    label='Email'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Type email here'
                    error={Boolean(errors.email)}
                    {...(errors.email && { helperText: errors.email.message })}
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: 6 }}>
              <Controller
                name='phone_number'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    autoFocus
                    label='Phone number'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Type phone number here'
                    error={Boolean(errors.email)}
                    {...(errors.phone_number && { helperText: errors.phone_number.message })}
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: 6 }}>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={() => (
                  <CustomTextField
                    fullWidth
                    label='Password'
                    id='auth-login-v2-password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{}}>
              <Controller
                name='confirm_password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    autoFocus
                    label='Confirm password'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Type confirm password here'
                    error={Boolean(errors.email)}
                    {...(errors.confirm_password && { helperText: errors.confirm_password.message })}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                mb: 6,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <FormControlLabel
                label='Remember Me'
                control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
                  sx={{ color: '#ffffff' }}
                />}
              />
              <Typography component={LinkStyled} href='/forgot-password'>
                Forgot Password?
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
              <Button type='submit' variant='contained' sx={{ mb: 4, px: 16, fontSize: 14, py: 4, borderRadius: 50 }}>
                Next
              </Button>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <IconButton
                href='/'
                component={Link}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                sx={{
                  color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300'),
                  ":hover": {
                    color: "#513fdc",
                    bgcolor: 'inherit'
                  }
                }}
              >
                <Icon icon='mdi:google' fontSize={32} />
              </IconButton>
              <IconButton
                href='/'
                component={Link}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                sx={{
                  color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300'),
                  ":hover": {
                    color: "#513fdc",
                    bgcolor: 'inherit'
                  }
                }}
              >
                <Icon icon='mdi:github' fontSize={32} />
              </IconButton>
              <IconButton
                href='/'
                component={Link}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                sx={{
                  ":hover": {
                    color: "#513fdc",
                    bgcolor: 'inherit'
                  }
                }}
              >
                <Icon icon='mdi:microsoft' fontSize={32} />
              </IconButton>
              <IconButton
                href='/'
                component={Link}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                sx={{
                  ":hover": {
                    color: "#513fdc",
                    bgcolor: 'inherit'
                  }
                }}
              >
                <Icon icon='mdi:apple' fontSize={32} />
              </IconButton>
              <IconButton
                href='/'
                component={Link}
                sx={{
                  color: '#1da1f2',
                  ":hover": {
                    color: "#513fdc",
                    bgcolor: 'inherit'
                  }
                }}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <Icon icon='mdi:azure' fontSize={32} />
              </IconButton>
            </Box>
          </form>
        </Box>
        <Box sx={{ width: '100%', maxWidth: 650 }}>
          <img src='/login/banner.png' alt='ai-studio' width='100%' height='auto' />
        </Box>
      </Box>
      {/* </RightWrapper> */}
    </AuthLayout>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
