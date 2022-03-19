import { Button as ButtonBootstrap, ButtonProps } from 'react-bootstrap'
import styled from 'styled-components'

export default function Button(props: ButtonProps) {
  return <ButtonStyled {...props} />
}

const ButtonStyled = styled(ButtonBootstrap)`
  border-radius: 100px;
  padding-left: 50px;
  padding-right: 50px;
  ${props => props.size === 'lg' && `
    @media (min-width: 992px) {
      padding-left: 92px;
      padding-right: 92px;
    }
  `}
  
  ${props => (props.variant === 'primary' || !props.variant) && `
    background-color: #1117A3;
    border-color: #1117A3;
    &:hover {
      background-color: #2329BF;
      border-color: #2329BF;
    }
  `}
`