import React, { useState } from 'react';
import { addUserEmailToProduct } from '../utils/actions';
import '../css/Modal.css'; // Import your CSS file here
import '../css/global.css'; // Import the new CSS file

const Modal = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addUserEmailToProduct(productId, email);
      setIsSubmitting(false);
      setEmail('');
      closeModal();
    } catch (error) {
      console.error('Error adding user email to product:', error);
      setIsSubmitting(false);
    }
  };

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button type="button" className="track-button" onClick={openModal}>
        Track
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <div className="modal-header">
              <div className="logo-container">
                <img
                  src="/assets/icons/logo.svg"
                  alt="logo"
                  width={28}
                  height={28}
                />
              </div>

              <img
                src="/assets/icons/x-close.svg"
                alt="close"
                width={24}
                height={24}
                className="close-icon"
                onClick={closeModal}
              />
            </div>

            <h4 className="modal-title">
              Stay updated with product pricing alerts right in your inbox!
            </h4>

            <p className="modal-description">
              Never miss a bargain again with our timely alerts!
            </p>

            <form className="modal-form" onSubmit={handleSubmit}>
              <label htmlFor="email" className="email-label">
                Email address
              </label>
              <div className="input-container">
                <img
                  src="/assets/icons/mail.svg"
                  alt="mail"
                  width={18}
                  height={18}
                />

                <input
                  required
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="email-input"
                />
              </div>

              <button type="submit" className="submit-btn">
                {isSubmitting ? 'Submitting...' : 'Track'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
