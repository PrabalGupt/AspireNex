import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Email = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_zci8sn4', 'template_qav9kb6', form.current, {
        publicKey: 'keKlpfvI4uoAiI5pk',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="email-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="from_name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="from_email" required />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>
      <input type="submit" value="Send" className="submit-button" />
    </form>
  );
};
