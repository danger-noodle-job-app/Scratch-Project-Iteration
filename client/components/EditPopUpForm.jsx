import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditPopUpForm = ({ id, dateApplied, company, title, salary, status, link, comments }) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [dateAppliedEdit, setdateApplied] = useState(dateApplied);
    const [companyEdit, setCompany] = useState(company);
    const [jobTitle, setJobTitle] = useState(title);
    const [salaryEdit, setSalary] = useState(salary);
    const [statusEdit, setStatus] = useState(status);
    const [linkEdit, setLink] = useState(link);
    const [commentsEdit, setComments] = useState(comments)
  
    function handleClick() {
      let formObj = {
        dateApplied: dateAppliedEdit,
        company: companyEdit,
        title: jobTitle,
        salary: salaryEdit,
        status: statusEdit,
        link: linkEdit,
        comments: commentsEdit,
      };
  
      fetch(`/edit/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(formObj),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
            console.log('patch successful! Heres your data!')
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
  
      handleClose();
      location.reload();
    }
  
    return (
      <>
        {/* can replace below with our own button element  */}
        <Button variant='primary' className='formButton' onClick={handleShow}>
          Edit
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton>
            {/* popup title bar */}
            <Modal.Title>Edit This Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              className='formInput'
              onSubmit={(e) => {
                e.preventDefault();
                {
                  /* setCompany, etc? */
                }
                setCompany('');
                setJobTitle('');
                setSalary('');
                setStatus('');
                setLink('');
                setComments('')
                {
                  /*props.newPost(company, jobTitle, etc*/
                }
              }}
            >
              {/* form elements below  */}
              <label>
                {' '}
                Date Applied:
                <input
                  id='dateApplied'
                  type='date'
                  value={dateAppliedEdit}
                  onChange={(e) => {
                    setdateApplied(e.target.value);
                  }}
                />
              </label>
              <label>
                {' '}
                Company:
                <input
                  id='company'
                  placeholder='Codesmith'
                  type='string'
                  value={companyEdit}
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                />
              </label>
              <label>
                {' '}
                Job Title:
                <input
                  id='jobTitle'
                  placeholder='Software Engineer'
                  type='string'
                  value={jobTitle}
                  onChange={(e) => {
                    setJobTitle(e.target.value);
                  }}
                />
              </label>
              <label>
                {' '}
                Status:
                <select
                  id='status'
                  value={statusEdit}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  {/* is there a way to dynamically show these based on the status array? */}
                  <option value='blank'>Select Status</option>
                  <option value='Interested'>Interested</option>
                  <option value='Applied'>Applied</option>
                  <option value='Interviewed'>Interviewed</option>
                  <option value='FollowedUp'>Followed Up</option>
                  <option value='Accepted'>Accepted</option>
                  <option value='Rejected'>Rejected</option>
                </select>
              </label>
              <label>
                {' '}
                Salary: $
                <input
                  id='salary'
                  placeholder='100,000'
                  type='number'
                  value={salaryEdit}
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
                />
              </label>
              <label>
                {' '}
                Link:
                <input
                  id='link'
                  placeholder='www.codesmith.io'
                  type='string'
                  value={linkEdit}
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                />
              </label>
              <label>
                {' '}
                Comments:
                <input
                  id='comments'
                  placeholder='Share your thoughts here'
                  type='string'
                  value={commentsEdit}
                  onChange={(e) => {
                    setComments(e.target.value);
                  }}
                />
              </label>
            </form>
          </Modal.Body>
          <Modal.Footer>
            {/* do we need this secondary button? or remove the hide? */}
            <Button variant='secondary' onClick={handleClose}>
              Don't Save
            </Button>
            {/* when they click track button - send to database  */}
            <Button variant='primary' onClick={handleClick}>
              Save new info!
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
  export default EditPopUpForm;