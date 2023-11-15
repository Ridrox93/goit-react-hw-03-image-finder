import Modal from 'react-modal';

const customStyles = {
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    margin: ' 0',
  },
};

Modal.setAppElement('#root');

export const ModalCustom = ({
  tags,
  largeImageURL,
  modalIsOpen,
  closeModal,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <img width="1200px" alt={tags} src={largeImageURL} />{' '}
    </Modal>
  );
};
