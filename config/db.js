// const mongoose = require('mongoose');
// const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://nrnayana3:2NQg54A4y1mfYswM@cluster0.uvbpmyc.mongodb.net/MachineTask', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('MongoDB connected');
//     } catch (error) {
//         console.error('Database connection failed', error);
//         process.exit(1);
//     }
// };
// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/MachineTask', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected locally');
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
};

module.exports = connectDB;
