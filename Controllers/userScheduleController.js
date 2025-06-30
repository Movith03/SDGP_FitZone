const UserSchedule = require('../Model/userscheduleModel');

const WorkoutAssign = (
  weight,
  age,
  currenybodytypee,
  goalbodytype,
  musclegain,
) => {
  let scheduleid = '0';

  if (age < 40 && age >= 25) {
    if (
      (currenybodytypee === 'heavy' && goalbodytype === 'fit') ||
      goalbodytype === 'fat' ||
      goalbodytype === 'avarage'
    ) {
      if (weight < 50 && weight >= 30) {
        scheduleid = '6702dc47acb292e7e0344f72';
      } else if (weight < 70 && weight >= 50) {
        scheduleid = '6703a44da332c8e080598139';
      } else if (weight < 95 && weight >= 70) {
        scheduleid = '6703a563a332c8e080598145';
      } else if (weight < 110 && weight >= 95) {
        scheduleid = '6703a609a332c8e080598153';
      } else if (weight < 150 && weight >= 110) {
        scheduleid = '6703a659a332c8e08059815d';
      }
    } else if (currenybodytypee === 'fat' && goalbodytype === 'fit') {
      if (weight < 50 && weight >= 30) {
        scheduleid = '6703af6ea332c8e0805981c8';
      } else if (weight < 70 && weight >= 50) {
        scheduleid = '6703afc3a332c8e0805981ce';
      } else if (weight < 95 && weight >= 70) {
        scheduleid = '6703b026a332c8e0805981d4';
      } else if (weight < 110 && weight >= 95) {
        scheduleid = '6703b057a332c8e0805981da';
      } else if (weight < 150 && weight >= 110) {
        scheduleid = '6703b097a332c8e0805981e0';
      }
    } else if (currenybodytypee === 'avarage' && goalbodytype === 'heavy') {
      if (weight < 50 && weight >= 30) {
        scheduleid = '6703a894a332c8e08059818b';
      } else if (weight < 70 && weight >= 50) {
        scheduleid = '6703a8caa332c8e080598191';
      } else if (weight < 95 && weight >= 70) {
        scheduleid = '6703a924a332c8e080598197';
      } else if (weight < 110 && weight >= 95) {
        scheduleid = '6703a96fa332c8e08059819d';
      } else if (weight < 150 && weight >= 110) {
        scheduleid = '6703a99aa332c8e0805981a3';
      }
    }
  } else if (age < 25 && age >= 18) {
    if (currenybodytypee === 'avarage' && goalbodytype === 'heavy') {
      if (weight < 50 && weight >= 30) {
        scheduleid = '6703b261a332c8e0805981e6';
      } else if (weight < 70 && weight >= 50) {
        scheduleid = '6703b29ca332c8e0805981ec';
      } else if (weight < 95 && weight >= 70) {
        scheduleid = '6703b2dba332c8e0805981f2';
      } else if (weight < 110 && weight >= 95) {
        scheduleid = '6703b30ca332c8e0805981f8';
      } else if (weight < 150 && weight >= 110) {
        scheduleid = '6703b344a332c8e0805981fe';
      }
    } else if (currenybodytypee === 'fat' && goalbodytype === 'fit') {
      if (weight < 50 && weight >= 30) {
        scheduleid = '6703b734a332c8e080598222';
      } else if (weight < 70 && weight >= 50) {
        scheduleid = '6703b773a332c8e080598228';
      } else if (weight < 95 && weight >= 70) {
        scheduleid = '6703b7f5a332c8e08059822e';
      } else if (weight < 110 && weight >= 95) {
        scheduleid = '6703b822a332c8e080598234';
      } else if (weight < 150 && weight >= 110) {
        scheduleid = '6703b96454368c7e98c0ebb8';
      }
    } else if (currenybodytypee === 'heavy' && goalbodytype === 'fit') {
      if (weight < 50 && weight >= 30) {
        scheduleid = '6702dc47acb292e7e0344f72';
      } else if (weight < 70 && weight >= 50) {
        scheduleid = '6703a8caa332c8e080598191';
      } else if (weight < 95 && weight >= 70) {
        scheduleid = '6703b057a332c8e0805981da';
      } else if (weight < 110 && weight >= 95) {
        scheduleid = '6703b29ca332c8e0805981ec';
      } else if (weight < 150 && weight >= 110) {
        scheduleid = '6703b96454368c7e98c0ebb8';
      }
    }
  } else if (age >= 50) {
    if (
      (currenybodytypee === 'heavy' && goalbodytype === 'fit') ||
      goalbodytype === 'fat' ||
      goalbodytype === 'avarage'
    ) {
      if (weight < 50 && weight >= 30) {
        scheduleid = '6703b3fea332c8e080598204';
      } else if (weight < 70 && weight >= 50) {
        scheduleid = '6703b45ba332c8e08059820a';
      } else if (weight < 95 && weight >= 70) {
        scheduleid = '6703b4bca332c8e080598210';
      } else if (weight < 110 && weight >= 95) {
        scheduleid = '6703b524a332c8e080598216';
      } else if (weight < 150 && weight >= 110) {
        scheduleid = '6703b59fa332c8e08059821c';
      }
    } else if (currenybodytypee === 'avarage' && goalbodytype === 'heavy') {
      if (weight < 50 && weight >= 30) {
        scheduleid = '6703af6ea332c8e0805981c8';
      } else if (weight < 70 && weight >= 50) {
        scheduleid = '6703afc3a332c8e0805981ce';
      } else if (weight < 95 && weight >= 70) {
        scheduleid = '6703b026a332c8e0805981d4';
      } else if (weight < 110 && weight >= 95) {
        scheduleid = '6703b057a332c8e0805981da';
      } else if (weight < 150 && weight >= 110) {
        scheduleid = '6703b097a332c8e0805981e0';
      }
    } else if (currenybodytypee === 'skinny' && goalbodytype === 'heavy') {
      if (weight < 50 && weight >= 30) {
        scheduleid = '6703b261a332c8e0805981e6';
      } else if (weight < 70 && weight >= 50) {
        scheduleid = '6703b29ca332c8e0805981ec';
      } else if (weight < 95 && weight >= 70) {
        scheduleid = '6703b2dba332c8e0805981f2';
      } else if (weight < 110 && weight >= 95) {
        scheduleid = '6703b2dba332c8e0805981f2';
      } else if (weight < 150 && weight >= 110) {
        scheduleid = '6703b2dba332c8e0805981f2';
      }
    }
  }

  if (scheduleid === '0') {
    const n = Math.floor(Math.random() * 10) + 1;
    const schedules = [
      '6703b29ca332c8e0805981ec',
      '6703b026a332c8e0805981d4',
      '6703a8caa332c8e080598191',
      '6703a609a332c8e080598153',
      '6702dc47acb292e7e0344f72',
      '6703b96454368c7e98c0ebb8',
      '6703b524a332c8e080598216',
      '6703b057a332c8e0805981da',
      '6703af6ea332c8e0805981c8',
      '6703a924a332c8e080598197',
      '6703a609a332c8e080598153',
    ];
    scheduleid = schedules[n];
  }

  return scheduleid;
};

exports.Workout = async (req, res) => {
  const userid = req.body.userid;
  const currentweight = parseFloat(req.body.currentweight);
  const currentbodytype = req.body.currentbodytype;
  const goalbodytype = req.body.goalbodytype;
  const muscleGoal = req.body.muscleGoal;
  const age = parseFloat(req.body.age);

  const scheduleid = WorkoutAssign(
    currentweight,
    age,
    currentbodytype,
    goalbodytype,
    muscleGoal,
  );
  try {
    const result = await UserSchedule.create({
      userid: userid,
      scheduleid: scheduleid,
    });

    res.status(201).json({
      status: 'success',
      data: {
        schedule: result,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: 'fail DDDDDD',
      message: error.message,
    });
  }
};

exports.getUserSchedule = async (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  try {
    const userSchedule = await UserSchedule.find({ userid: req.params.id });

    if (!userSchedule) {
      return res.status(404).json({
        status: 'fail',
        message: 'No userSchedule found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        userSchedule,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};
