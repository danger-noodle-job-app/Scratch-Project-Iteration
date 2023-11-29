/**
 * @jest-environment jsdom
 */

const { JSDOM }  = require('jsdom');
const React = require('react');
const { render, screen, waitFor } = require('@testing-library/react')
const { TextEncoder } = require('text-encoding-utf-8');
const Post = require('../components/Post.jsx');
const { act } = require('react-test-renderer');

// Object.assign(global, { TextDecoder, TextEncoder });


const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = jsdom.window.document;
global.window = jsdom.window;
global.TextEncoder = TextEncoder;

describe('Unit testing Post.jsx React Component', () => {
    describe('Post', () => {
      let color;
      const props = {
        stat: 'Applied',
        dateApplied: new Date(),
        company: 'test Company',
        title: 'Sr. SWE',
        salary: '500000',
        link: 'www.google.com',
      };

      beforeAll(() => {
        act(() => render(<Post stat={props.stat} dateApplied={props.dateApplied} company={props.company} title={props.title} salary={props.salary} link={props.link} />));
      })
  
      test('Renders correctly with props', () => {
  
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

