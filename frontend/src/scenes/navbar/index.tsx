import { FlexBetween } from '@/components/FlexBetween'
import { Typography, useTheme } from '@mui/material'
import {useState} from 'react'

type Props = {}

const NavBar = (props: Props) => {
    const {palette} = useTheme()
  return (
    <FlexBetween mb={'0.25rem'} p={'0.5rem 1rem'} height={'4rem'} color={palette.grey[100]} bgcolor={palette.secondary.dark}>
        <Typography variant='h3'>Customer Managment</Typography>
        <Typography variant='h3'>User</Typography>
    </FlexBetween>
  )
}

export { NavBar }