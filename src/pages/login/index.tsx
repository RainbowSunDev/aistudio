// ** React Imports
import { useState, ReactNode, MouseEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import AuthLayout from 'src/layouts/auth'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.common.white} !important`,
  ":hover": {
    color: "#9c8ffd!important"
  },
  transition:'all!important'
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.common.white
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'admin',
  email: 'admin@aistudio.ml'
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // const theme = useTheme()
  // ** Hooks
  const auth = useAuth()

  // const isDark = theme.palette.mode === 'dark'

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    console.log("data",data)
    auth.login({ email, password, rememberMe }, () => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

  return (
    <AuthLayout>
        <Box
          sx={{
            mt:16,
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
              <Typography variant='h1' sx={{ mb: 1.5, color: '#ffffff', fontSize:48, fontWeight:500, letterSpacing:-0.75, lineHeight:'56px' }}>
                Log in to
                <br />
                your account
              </Typography>
            </Box>

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 8 }}>
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
              <Box sx={{ mb: 4 }}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      placeholder='Type password here'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
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
              <Box
                sx={{
                  mb: 8,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  label='Remember Me'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
                <Typography component={LinkStyled} href='/forgot-password' >
                  Forgot Password?
                </Typography>
              </Box>
              <Button type='submit' variant='contained' sx={{ mb: 4, px:16, fontSize:14, py:4, borderRadius:50 }}>
                Login
              </Button>
              <Box sx={{ display: 'flex' }}>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  sx={{
                    color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300'),
                    ":hover": {
                      color: "#513fdc",
                      bgcolor:'inherit'
                    }
                  }}
                >
                  <Icon icon='mdi:google'fontSize={32} />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  sx={{
                    color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300'),
                    ":hover": {
                      color: "#513fdc",
                      bgcolor:'inherit'
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
                      bgcolor:'inherit'
                    }
                   }}
                >
                  <Icon icon='mdi:microsoft' fontSize={32}/>
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                  sx={{
                    ":hover": {
                      color: "#513fdc",
                      bgcolor:'inherit'
                    }
                   }}
                >
                  <Icon icon='mdi:apple' fontSize={32}/>
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{
                    color: '#1da1f2',
                    ":hover": {
                      color: "#513fdc",
                      bgcolor:'inherit'
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
    </AuthLayout>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
