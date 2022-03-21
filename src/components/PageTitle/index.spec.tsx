import { render, screen } from "@testing-library/react"
import PageTitle from "."

describe('<PageTitle />', ()=> {
  it('should render title', ()=> {
    render(<PageTitle>My Title</PageTitle>)
    expect(screen.getByRole('heading')).toHaveTextContent('My Title')
  })
})