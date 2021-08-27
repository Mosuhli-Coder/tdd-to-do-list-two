import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import React from 'react';
import mockData from './mockData';
import userEvent from '@testing-library/user-event';

beforeEach(() =>{
  //fetchMock.once(JSON.stringify(mockData))
  fetchMock.resetMocks();
})

describe('App Component Tests', () => {

  

  it('Should render App Component', async() => {
    fetchMock.once(JSON.stringify(mockData));
    render(<App/>);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

  })



  it('Should add a todoItem', async() => {

    fetchMock.once(
      JSON.stringify({
        userId: 3,
        id: Math.floor(Math.random() * 100) +1,
        title: 'Watch Nijel Amos',
        completed: false
      })
    );
    render(<App/>);

    //await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    userEvent.type(screen.getByRole('textbox'), 'To watch Nijel Amos');
    userEvent.click(screen.getByText(/Add new todo/i));
    await waitForElementToBeRemoved(() => screen.getByText(/saving/i));
    expect(screen.getByText(/To watch Nijel Amos/i)).toBeInTheDocument()
  
    
  })
  it('removes todo from list', async()=>{
    await waitForElementToBeRemoved(()=> screen.getByText(/loading/i));
    userEvent.click(screen.queryByText(/Take out the trash/i)).not.toBeInTheDocument();
  })
})
