const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { User } = require('./models/User');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendOtpEmail = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: `"Publishine Support" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Your OTP Code for Publishine Account Verification',
            html: `
                <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                    <h2 style="text-align: center; color: #4CAF50;">Publishine Account Verification</h2>
                    <p>Dear User,</p>
                    <p>Thank you for registering with Publishine. To complete your registration, please use the OTP code below to verify your email address.</p>
                    <h3 style="text-align: center; font-size: 24px; color: #333;">${otp}</h3>
                    <p>This OTP code is valid for <strong>10 minutes</strong>.</p>
                    <p>If you did not request this code, please ignore this email.</p>
                    <p style="margin-top: 20px;">Best regards,</p>
                    <p>The Publishine Team</p>
                    <hr>
                    <p style="font-size: 12px; color: #666;">If you have any issues, please contact us at <a href="mailto:support@sprinsoft.com">support@sprinsoft.com</a></p>
                </div>
            `,
        });
    } catch (error) {
        throw new Error('Failed to send OTP email. Please try again later.');
    }
};

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const otp = generateOtp();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        const user = new User({ email, password, otp, otpExpires });

        await user.save();
        await sendOtpEmail(email, otp);
        res.status(201).json({ success: true, message: 'User registered successfully. OTP sent to email', user: user._id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: 'Invalid Credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(200).json({
            success: true,
            message: 'Login Success',
            token,
            user: { id: user._id, name: user.name, role: user.role, isVerified: user.isVerified }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.becomeDeveloper = async (req, res) => {
    try {
        const { name, bio, profilePicture, linkedIn, contactNumber } = req.body;
        if (!name || !bio || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required details to become a Developer'
            });
        }
        const user = await User.findByIdAndUpdate(req.user._id, { role: 'Developer', bio, linkedIn, contactNumber }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'You have successfully become a Developer.',
            user: {
                name: user.name,
                role: user.role,
                bio: user.bio,
                linkedIn: user.linkedIn,
                contactNumber: user.contactNumber,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating your role. Please try again later.',
        });
    }
};

exports.becomePublisher = async (req, res) => {
    try {
        const { name, bio, profilePicture, linkedIn, contactNumber } = req.body;
        if (!name || !bio || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required details to become a Publisher'
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                role: 'Publisher',
                bio,
                linkedIn,
                contactNumber
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.status(200).json({
            success: true,
            message: 'You have successfully become a Publisher.',
            user: {
                name: user.name,
                role: user.role,
                bio: user.bio,
                linkedIn: user.linkedIn,
                contactNumber: user.contactNumber,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating your role. Please try again later.',
        });
    }
};
