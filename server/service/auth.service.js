import { getUserByEmailQuery, updateSessionQuery, insertUserQuery, getUserByCredentialsQuery, getUserPass } from "../bdq/users.dbq.js";
import store from "../store/redis/redis.js";
import { isValidEmail, isValidPhone, isValidField, isValidQueryParam, handleUndefinedFields } from "../utilities/checkHandler.js";
import { hashPassword, hashCompare } from "../utilities/hashData.js";

const checkEmail = async (email) => {
  try {
    const emailResult = await getUserByEmailQuery(email);
    return emailResult.rows.length > 0;
  } catch (error) {
    console.log(error)
  }
};

const verifyEmail = async (data) => {
  try {
    const { email } = data;
    if (email === undefined) {
      return handleUndefinedFields()
    }
    if (!isValidEmail(email)) {
      return { status: 403, description: 'Invalid email', message: 'Please provide a valid email id' };
    }
    const emailResult = await checkEmail(email);

    if (!emailResult) {
      return { status: 404, description: 'Email not found', message: 'Email doesn\'t exist' };
    }

    return { status: 200, description: 'Sent OTP', message: 'Successfully sent OTP to the given email address' }
  } catch (error) {
    throw new Error(error)
  }
}

const createUser = async (data) => {
  try {
    const { first_name, last_name, email, phone, pass, confirm_pass } = data;
    if (!isValidField(data)) {
      return handleUndefinedFields()
    }

    if (!isValidEmail(email)) {
      return { status: 403, description: 'Invalid email', message: 'Please provide a valid email id' };
    }

    if (!isValidPhone(phone)) {
      return { status: 403, description: 'Invalid phone number', message: 'Please provide a valid phone number' };
    }

    if (pass !== confirm_pass) {
      return { status: 403, description: 'Password incorrect', message: 'Password and Confirm password do not match' };
    }

    const emailResult = await checkEmail(email);

    if (emailResult) {
      return { status: 403, description: 'Invalid email', message: 'Email already exists' };
    }
    const hashPass = await hashPassword(pass)
    await insertUserQuery(first_name, last_name, email, phone, hashPass);

    const getUser = await getUserByCredentialsQuery(email, hashPass);

    if (getUser.rows.length > 0) {
      const { session_uuid, user_uuid, user_role, first_name, last_name, phone, email } = getUser.rows[0];
      const response = { session_uuid, user_uuid, user_role, first_name, last_name, phone, email };

      //Redis store
      const requestBody = {
        method: "hset",
        key: session_uuid,
        value: response
      }
      await store(requestBody)
      return { status: 200, description: 'Success', message: 'Successfully login', data: response };
    } else {
      return { status: 404, description: 'User not found', message: 'Login failed' };
    }

  } catch (error) {
    throw new Error(error)
  }
};

const loginUser = async (data) => {
  try {
    const { email, pass } = data;
    if (!isValidQueryParam(data)) {
      return handleUndefinedFields()
    }
    const emailResult = await checkEmail(email);

    if (!emailResult) {
      return { status: 404, description: 'Email not found', message: 'Email doesn\'t exist' };
    }

    const hashPassword = await getUserPass(email)

    const passwordResult = await hashCompare(pass, hashPassword.rows[0].pass);

    if (!passwordResult) {
      return { status: 404, description: 'Invalid password', message: 'Please check your credentials' };
    }

    const result = await updateSessionQuery(email)

    const getUser = await getUserByEmailQuery(email)

    if (result.rowCount === 1) {
      const { session_uuid, user_uuid, user_role, first_name, last_name, phone, email } = getUser.rows[0]
      const response = { session_uuid, user_uuid, user_role, first_name, last_name, phone, email }

      //Redis store
      const requestBody = {
        method: "hset",
        key: session_uuid,
        value: response
      }
      await store(requestBody)

      return { status: 200, description: 'Success', message: 'Successfully login', data: response };
    } else {
      throw new Error('Update Failed')
    }

  } catch (error) {
    throw new Error(error)
  }
};

export {
  checkEmail,
  verifyEmail,
  createUser,
  loginUser
}
