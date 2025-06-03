const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Your Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const yourPhoneNumber = process.env.YOUR_PHONE_NUMBER; // Your phone number to receive SMS

const client = twilio(accountSid, authToken);

app.post('/send-sms', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Format the message
        const smsMessage = `New Contact Form Message:\nFrom: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
        
        // Send SMS using Twilio
        await client.messages.create({
            body: smsMessage,
            from: twilioPhoneNumber,
            to: yourPhoneNumber
        });
        
        res.status(200).json({ message: 'SMS sent successfully' });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ error: 'Failed to send SMS' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 