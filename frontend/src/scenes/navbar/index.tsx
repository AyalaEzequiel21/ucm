import { FlexBetween } from '@/components/FlexBetween'
import { useTheme } from '@mui/material'
import {useState} from 'react'

type Props = {}

const NavBar = (props: Props) => {
    const {palette} = useTheme()
  return (
    <FlexBetween mb={'0.25rem'} p={'0.5rem'} color={palette.grey[100]} bgcolor={palette.secondary.dark}>
        NAV
    </FlexBetween>
  )
}

export { NavBar }