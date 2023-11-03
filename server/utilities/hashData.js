import bcrypt from 'bcrypt';

// const saltRounds = 10; // Number of rounds for salting

// const hashPassword = (password) => {
// Generate a salt
// const salt = await bcrypt.genSalt(saltRounds);

// Hash the value with the generated salt

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (err) {
    throw new Error('Error hashing password');
  }
};

const hashCompare = async (password, dbpassword) => {
  try {
    const hash = await bcrypt.compare(password, dbpassword);
    return hash;
  } catch (err) {
    throw new Error('Error hashing password');
  }
};

export {
  hashPassword,
  hashCompare
};


