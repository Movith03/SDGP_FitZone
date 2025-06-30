const UserData = require('../Model/userData');

exports.createUserData = async (req, res) => {
  try {
    const data = await UserData.create(req.body);

    res.status(201).json({
      status: 'success',
      message: {
        data: data,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err,
    });
  }
};
