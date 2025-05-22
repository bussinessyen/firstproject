import Contact from '../models/contactModel.js';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log('Received contact form:', { name, email, message });

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    console.log('Contact saved to DB:', contact);

    return res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error saving contact form:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
