// controllers/dietPlanController.js
const DietPlan = require('../Model/dietplanModel');
const UserDiet = require('../Model/userDiet');

const dietplan = (age, weight, goalweight, vegetarianornon, alagicfoods) => {
  let dietplanId = "6703d233a5e2822e457d1aef";
  if (age >= 18 && age < 30) {
    if (weight < goalweight) {
      if (vegetarianornon === 'Non-Vegetarian') {
        let al = false;
        const food = ['egg', 'pasta'];
        alagicfoods.map((el) => {
          for (i = 0; i < food.length; i++) {
            if (food[i] === el) {
              al = true;
            } else {
              al = false;
            }
          }

          if (al) {
            dietplanId = '6703d233a5e2822e457d1aef';
          } else {
            dietplanId = '6703e8f9ef55c251d13467e6';
          }
        });
      } else {
        let al = false;
        const food = ['egg', 'pasta'];
        alagicfoods.map((el) => {
          for (i = 0; i < food.length; i++) {
            if (food[i] === el) {
              al = true;
            } else {
              al = false;
            }
          }

          if (al) {
            dietplanId = '6707fae1569196f12c043503';
          } else {
            dietplanId = '6707fae7569196f12c043509';
          }
        });
      }
    } else if (weight > goalweight) {
      if (vegetarianornon === 'Non-Vegetarian') {
        let al = false;
        const food = ['egg', 'pasta'];
        alagicfoods.map((el) => {
          for (i = 0; i < food.length; i++) {
            if (food[i] === el) {
              al = true;
            } else {
              al = false;
            }
          }

          if (al) {
            dietplanId = '6707faec569196f12c04350f';
          } else {
            dietplanId = '6707faf1569196f12c043515';
          }
        });
      } else {
        let al = false;
        const food = ['egg', 'pasta'];
        alagicfoods.map((el) => {
          for (i = 0; i < food.length; i++) {
            if (food[i] === el) {
              al = true;
            } else {
              al = false;
            }
          }

          if (al) {
            dietplanId = '6707fafc569196f12c043521';
          } else {
            dietplanId = '6707fb01569196f12c043527';
          }
        });
      }
    }
  }

  return dietplanId;
};

exports.userdietplan = async (req, res) => {
  const age = req.body.age;
  const currentweight = req.body.currentweight;
  const goalweight = req.body.goalweight;
  const allergicfoods = req.body.allergicfoods;
  const userid = req.body.userid;
  const diet = req.body.diet;

  try {
    const dietID = dietplan(
      age,
      currentweight,
      goalweight,
      diet,
      allergicfoods,
    );

    const data = await UserDiet.create({ userid: userid, dietid: dietID });

    if (dietID === '0') {
      return res.status(401).json({
        status: 'fail',
        message: 'diet id empty',
      });
    }

    res.status(200).json({
      status: 'sucess',
      message: {
        data: data,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getuserdiet = async (req, res) => {
  try {
    const dietPlan = await UserDiet.find({ userid: req.params.id });
    if (!dietPlan) {
      return res.status(404).json({
        status: 'fail',
        message: 'No diet plan found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        dietPlan,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.createDietPlan = async (req, res) => {
  try {
    const dietPlan = await DietPlan.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        dietPlan,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getAllDietPlans = async (req, res) => {
  try {
    const dietPlans = await DietPlan.find();
    res.status(200).json({
      status: 'success',
      results: dietPlans.length,
      data: {
        dietPlans,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getDietPlanById = async (req, res) => {
  try {
    const dietPlan = await DietPlan.findById(req.params.id);
    if (!dietPlan) {
      return res.status(404).json({
        status: 'fail',
        message: 'No diet plan found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        dietPlan,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
