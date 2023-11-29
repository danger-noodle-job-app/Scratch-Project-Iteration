import React from 'react';
// const React = require('react');
import { useDrag } from 'react-dnd';
// const { useDrag } = require('react-dnd');
import EditPopUpForm from './EditPopUpForm.jsx';

const Post = ({ id, dateApplied, company, title, salary, status, link, comments }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'post',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  let colorArray = {
    Interested: 'yellow',
    Applied: 'lightpink',
    Interviewed: 'lightblue',
    FollowedUp: 'lavender',
    Accepted: 'lightgreen',
    Rejected: 'lightsalmon',
  };

  function handleClick() {
    fetch(`/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    location.reload();
  }

  return (
    <div
      className='postBox'
      style={{ backgroundColor: colorArray[status] }}
      ref={drag}
    >
      <EditPopUpForm
        key={id}
        id={id}
        dateApply={dateApplied}
        company={company}
        title={title}
        salary={salary}
        status={status}
        link={link}
        comments={comments}
      />
      <button className='postButton' onClick={handleClick}>
        Edit This Post
      </button>
      <button className='postButton' onClick={handleClick}>
        X
      </button>
      <p>
        <b>Date Applied: </b>
        {dateApplied.substring(0, 10)}
      </p>
      <p>
        <b>Company: </b>
        {company}
      </p>
      <p>
        <b>Job Title: </b>
        {title}
      </p>
      <p>
        <b>Salary: </b>
        {salary}
      </p>
      <p>
        <b>Status: </b>
        {status}
      </p>
      <p>
        <b>Job Link: </b>
        <a href={`http://${link}`}>Click on Link</a>
      </p>
      <p>
        <b>Comments: </b>
        {comments}
      </p>
    </div>
  );
};

export default Post;
