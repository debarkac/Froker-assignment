const jwt = require('jsonwebtoken');
const User = require('./models/User');


exports.signup = async (req, res) => {
    const { phoneNumber, email, name, dob, Salary, password } = req.body;

    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    if (age < 20) 
        return res.status(400).json({ msg: 'User must be above 20 years of age' });
    
    if (Salary < 25000) 
        return res.status(400).json({ msg: 'Monthly salary must be 25k or more' });

    try {
        let user = await User.findOne({ email });
        if (user) 
            return res.status(400).json({ msg: 'User already exists' });

        user = new User({
            phoneNumber,
            email,
            name,
            dob,
            Salary,
            password 
        });

        user.status = 'Approved';
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) 
            return res.status(400).json({ msg: 'Invalid login details' });

        if (password !== user.password) 
            return res.status(400).json({ msg: 'Invalid login details' });

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'yourSecretKey', (err, token) => {
            if (err) throw err;
            res.json({ msg: 'Congratulations! Login successful',token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.borrowMoney = async (req, res) => {
    const { amount } = req.body;
    try {
        const user = await User.findById(req.user.id);

        
        user.purchase = user.purchase+amount;
        await user.save();

        const t = 12; 
        const Rate = 0.08;
        const repayment = (amount * (1 + Rate)) / t;

        res.json({
            PurchasePower: user.purchase,
            repayment
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
