import React from 'react';
// import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react';
// import regeneratorRuntime from 'regenerator-runtime';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

import { Post } from '../components/Post.jsx';


describe('Unit testing Post.jsx React Component', () => {
    describe('Post', () => {
      const props = {
        status: 'Applied',
        dateApplied: '2020-01-01',
        id: 1,
        company: 'test Company',
        title: 'Sr. SWE',
        salary: 500000,
        link: 'www.google.com',
      };
  
      test('Renders correctly with props', () => {
        render(<Post {...props} />);
  
        // Assert that the rendered component contains relevant information
        expect(screen.getByText('Date Applied: 2020-01-01')).toBeInTheDocument();
        expect(screen.getByText('Company: test Company')).toBeInTheDocument();
        expect(screen.getByText('Job Title: Sr. SWE')).toBeInTheDocument();
        expect(screen.getByText('Salary: 500000')).toBeInTheDocument();
        expect(screen.getByText('Status: Applied')).toBeInTheDocument();
        expect(screen.getByText('Click on Link').getAttribute('href')).toBe(
          'http://www.google.com'
        );
      });
  
      test('Sets correct background color via props passed status variable', () => {
        render(<Post {...props} />);
  
        const postBox = screen.getByTestId('post-box');
  
        // Assert that the background color is set correctly based on the status prop
        expect(postBox).toHaveStyle('background-color: lightpink');
      });
  
      {/* test('Handles button click event', () => {
        const mockDeleteFetch = jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({}) })
        );
  
        global.fetch = mockDeleteFetch;
  
        render(
          <DndProvider backend={HTML5Backend}>
            <Post {...props} />
          </DndProvider>
        );
  
        const deleteButton = screen.getByText('X');
  
        // Simulate a button click
        fireEvent.click(deleteButton);
  
        // Assert that the fetch function was called with the correct URL
        expect(mockDeleteFetch).toHaveBeenCalledWith('/1', { method: 'DELETE' });
      }); */}
    });
  });

