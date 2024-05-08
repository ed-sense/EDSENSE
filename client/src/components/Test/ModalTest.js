import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function ModalTest({ stage }) {
  const [show, setShow] = useState(false);
  const [hintCounter, setHintCounter] = useState(0);

  const handleHintClick = () => {
    setHintCounter((hintCounter) => hintCounter + 1);
    setShow(true); // Show the modal when the hint button is clicked
  };

  const handleClose = () => setShow(false);

  let videoSrc;

  // Set the video source based on the stage prop
  switch (stage) {
    case 1:
      videoSrc = 'https://www.youtube.com/embed/igcoDFokKzU?si=a1hH5pVHll6UerMD';
      break;
    case 2:
      videoSrc = 'https://www.youtube.com/embed/qM7B2nwpV1M?si=D_RVJ7nrbdPCeYJM';
      break;
    case 3:
      videoSrc = 'https://www.youtube.com/embed/pEbjmAsrOic?si=jyuAQbAbdhWs_9zk';
      break;
    default:
      // Handle other cases or provide a default video source
      videoSrc = '';
  }

  return (
    <>
      <button className="hintButton" onClick={handleHintClick}>
        Hint ?
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        {/* Set size to "lg" (large) to make sure the modal can contain the iframe */}
        <Modal.Header closeButton>
          <Modal.Title>Tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '20px' }}>
          <p>Hint Counter: {hintCounter}</p>
          {/* Embed the YouTube video inside the modal */}
          <iframe
            title="YouTube Video Tutorial"
            style={{ width: '100%', height: '400px' }}
            src={videoSrc}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal.Body>
        {/* You can add additional elements or styling here */}
        <Modal.Footer>
          {/* Add your buttons or other elements here */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalTest;
