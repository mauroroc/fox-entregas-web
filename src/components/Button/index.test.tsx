import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Button from '.'

describe('<Button />', () => {
  it('should render button with text', () => {
    render(<Button>Label</Button>)
    //screen.debug()
    expect(screen.getByRole('button')).toHaveTextContent('Label')
  })

  it('should call handle event on click', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Label</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toBeCalledTimes(1)
  })

  it('should render as a link if href is provided', () => {
    render(<Button href="/url">Label</Button>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/url')
  })

  it('should render as a link if to is provided', ()=> {
    render(<BrowserRouter><Button to="/url">Label</Button></BrowserRouter>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/url')
  })

  it('should render loading if loading is true', ()=> {    
    render(<Button loading>Label</Button>)
    const status = screen.getByRole('status')        
    expect(status).toBeVisible()
    expect(status).toHaveTextContent('Carregando...')
  })

  it('should NOT render loading if loading is false', ()=> {
    render(<Button loading={false}>Label</Button>)    
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('should NOT render loading if loading is not provided', ()=> {
    render(<Button>Label</Button>)    
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('should disable button if disabled is provided', ()=> {
    render(<Button disabled>Label</Button>) 
    expect(screen.getByRole('button')).toBeDisabled()
  })

})