import styled from "styled-components"

type Props = {
  children?: React.ReactNode
}
export default function PageTitle({children}: Props) {
  return (
    <TitleStyled className="text-center mt-4">{children}</TitleStyled>
  )
}

const TitleStyled = styled.h1`
  color: #1117A3;
  font-size: 1.75rem;
  font-weight: 400;
`