const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const { auth } = require('../middleware/auth');

router.post('/users', controller.register);
router.post('/users/login', controller.login);
router.post('/users/become-developer', auth, controller.becomeDeveloper);
router.post('/users/become-publisher', auth, controller.becomePublisher);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: User's full name
 *           example: Ahsen Khan
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: ahsen.khan@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *           example: securePassword123
 *         role:
 *           type: string
 *           enum: ['Publisher', 'Developer', 'Tester']
 *           description: User's role within the system
 *           example: Developer
 *         bio:
 *           type: string
 *           description: User's biography (for Developer or Publisher)
 *           example: Experienced mobile app developer
 *         profilePicture:
 *           type: string
 *           description: URL to user's profile picture
 *           example: https://example.com/profile.jpg
 *         linkedIn:
 *           type: string
 *           description: User's LinkedIn profile URL
 *           example: https://linkedin.com/in/ahsenkhan
 *         contactNumber:
 *           type: string
 *           description: User's contact number
 *           example: +1234567890
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User registered successfully. OTP sent to email
 *                 user:
 *                   type: string
 *                   description: ID of the newly registered user
 *                   example: 60d5ecb74e4d8b1c9c9d1c5f
 *       400:
 *         description: Email already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Email already in use
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server error
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: ahsen.khan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGQ1ZWNiNzRlNGQ4YjFjOWM5ZDFjNWIiLCJpYXQiOjE2MzM4MjQ1Mzd9.dkjadfAKjbqw9X2b8s9g8dwbjVq2obp
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60d5ecb74e4d8b1c9c9d1c5f
 *                     name:
 *                       type: string
 *                       example: Ahsen Khan
 *                     role:
 *                       type: string
 *                       example: Developer
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server error
 */

/**
 * @swagger
 * /api/users/become-developer:
 *   post:
 *     summary: Become a Developer
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bio
 *               - profilePicture
 *               - linkedIn
 *               - contactNumber
 *             properties:
 *               bio:
 *                 type: string
 *                 description: User's biography for Developer role
 *                 example: Experienced mobile app developer
 *               profilePicture:
 *                 type: string
 *                 description: URL of user's profile picture
 *                 example: https://example.com/profile.jpg
 *               linkedIn:
 *                 type: string
 *                 description: LinkedIn profile URL
 *                 example: https://linkedin.com/in/ahsenkhan
 *               contactNumber:
 *                 type: string
 *                 description: Contact number of user
 *                 example: +1234567890
 *     responses:
 *       200:
 *         description: Successfully updated role to Developer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: You have successfully become a Developer.
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Ahsen Khan
 *                     role:
 *                       type: string
 *                       example: Developer
 *                     bio:
 *                       type: string
 *                       example: Experienced mobile app developer
 *                     profilePicture:
 *                       type: string
 *                       example: https://example.com/profile.jpg
 *                     linkedIn:
 *                       type: string
 *                       example: https://linkedin.com/in/ahsenkhan
 *                     contactNumber:
 *                       type: string
 *                       example: +1234567890
 *       400:
 *         description: Missing required details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Please provide all required details to become a Developer
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: An error occurred while updating your role. Please try again later.
 */

/**
 * @swagger
 * /api/users/become-publisher:
 *   post:
 *     summary: Become a Publisher
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bio
 *               - profilePicture
 *               - linkedIn
 *               - contactNumber
 *             properties:
 *               bio:
 *                 type: string
 *                 description: User's biography for Publisher role
 *                 example: Professional content creator
 *               profilePicture:
 *                 type: string
 *                 description: URL of user's profile picture
 *                 example: https://example.com/profile.jpg
 *               linkedIn:
 *                 type: string
 *                 description: LinkedIn profile URL
 *                 example: https://linkedin.com/in/ahsenkhan
 *               contactNumber:
 *                 type: string
 *                 description: Contact number of user
 *                 example: +1234567890
 *     responses:
 *       200:
 *         description: Successfully updated role to Publisher
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: You have successfully become a Publisher.
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Ahsen Khan
 *                     role:
 *                       type: string
 *                       example: Publisher
 *                     bio:
 *                       type: string
 *                       example: Professional content creator
 *                     profilePicture:
 *                       type: string
 *                       example: https://example.com/profile.jpg
 *                     linkedIn:
 *                       type: string
 *                       example: https://linkedin.com/in/ahsenkhan
 *                     contactNumber:
 *                       type: string
 *                       example: +1234567890
 *       400:
 *         description: Missing required details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Please provide all required details to become a Publisher
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: An error occurred while updating your role. Please try again later.
 */
