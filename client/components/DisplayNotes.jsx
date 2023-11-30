import React from 'react';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import Post from './Post.jsx';

const DisplayNotes = ({ status }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'post',
    drop: (item) => changeStatus(item.id), // save the item.id to a variable
    collect: (montior) => ({
      isOver: !!montior.isOver(),
    }),
  }));

  const changeStatus = (id) => {
    fetch(`/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    location.reload();
  };

  const data = useSelector((state) => state.notes[status]);

  const postArray = [];
  data.forEach((ele) => {
    if (ele.dateApplied === null) ele.dateApplied = '2023-10-31';
    postArray.push(
      <Post
        key={ele._id}
        id={ele._id}
        dateApplied={ele.dateApplied}
        company={ele.company}
        title={ele.title}
        salary={ele.salary}
        status={ele.status}
        link={ele.link}
        comments={ele.comments}
      />
    );
  });
  return (
    <div className='statusColumn' ref={drop}>
      <label id='status'>{status}</label>
      <div className='postContainer'>{postArray}</div>
    </div>
  );
};

export default DisplayNotes;
