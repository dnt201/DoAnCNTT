const User = require('../models/user.Model');

const seedData = async () => {
    const listUser = await User.find().count();
    if (listUser === 0) await CreateAdmin();
}

async function CreateAdmin(){
    const adminUser = {
        name: 'admin',
        email: 'admin@example.com',
        password: 'Hcmute2021',
        role: 'admin',
        isActive: 1
    }
    const admin = await User.create(adminUser);
    await admin.save({validateBeforeSave: false});

    console.log('Create Admin Success');
}

module.exports = seedData;