const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Publisher', 'Developer', 'Tester'], required: true },
    isApproved: { type: Boolean, default: false },
    balance: { type: Number, default: 0 },
    publisherDetails: {
        contactNumber: { type: String },
        stripeAccount: { type: String },
        googlePlayConsoleEmail: { type: String },
        publishedApps: [{ type: String }],
        accountScreenshots: [{ type: String }],
    },
});

const AppSchema = new Schema({
    developer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    apkFile: { type: String, required: true },
    aabFile: { type: String, required: true },
    images: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Published', 'Rejected'], default: 'Pending' },
    dateSubmitted: { type: Date, default: Date.now },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model('User', UserSchema);
const App = mongoose.model('App', AppSchema);

module.exports = { User, App };
