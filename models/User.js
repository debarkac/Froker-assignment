const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    phoneNumber:{ 
        type: String, 
        required: true 
    },
    email:{ 
        type: String, 
        required: true, 
        unique: true 
    },
    name:{ 
        type: String, 
        required: true 
    },
    registrationDate:{ 
        type: Date, 
        default: Date.now 
    },
    dob:{ 
        type: Date, 
        required: true 
    },
    Salary:{ 
        type: Number,
        required: true 
    },
    password:{ 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
    },
    purchase:{ 
        type: Number, 
        default:0,
},
});

module.exports = mongoose.model('User', UserSchema);
