import emailjs from '@emailjs/browser';

export const sendToMail = async (data) => {
  // Prepare form data for EmailJS
  const templateParams = {
    ...data,
  };

  try {
    // Send email containing form data
    await emailjs.send(
      'service_xal9mrc',
      'template_ehlch6c',
      templateParams, // Form data to be sent
      'Wv61Pn9AOeH61J_Jm',
    );
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};
