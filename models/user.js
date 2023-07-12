const Files = require('../helpers/fileHelper');

const signUpUserSchema = {
    email: { 
        notEmpty: true, 
        isEmail: {
            errorMessage: 'Must be a valid e-mail address',
        },
        custom: {
            options: (value) => {
                const allUsers = Files.readFileSync();
                const existingUserId = allUsers.findIndex(user => user.email === value);
                if ( existingUserId !== -1 ) {
                  // Will use the below as the error message
                  throw new Error('A user already exists with this e-mail address');
                } 
            }
        }
    },
    pasword: {
        notEmpty: true, 
        isLength: { 
            options: { 
                min: 8 
            } 
        }
    },
    categories: {
        notEmpty: true,
        isIn: [['business', 'entertainment', 'general', 'health science', 'sports', 'technology']]
    },
    sources: {
        notEmpty: true,
        isIn: [['abc-news', 'abc-news-au', 'aftenposten', 'al-jazeera-english']]
    }
}

module.exports = { signUpUserSchema }