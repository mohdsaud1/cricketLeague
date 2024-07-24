const Admin = require('../models/Admin');
const Player = require('../models/Player'); 
const Team = require('../models/Team'); 

exports.getAdminLogin = (req, res) => {
  res.render('admin/login');
};

const adminCredentials = {
  username: 'admin',
  password: '123' // You can use bcrypt to hash this password if needed
};

exports.postAdminLogin = async (req, res) => {
  const { username, password } = req.body;

  if (username === adminCredentials.username && password === adminCredentials.password) {
    req.session.admin = { username: adminCredentials.username, isAdmin: true };
    return res.redirect('/admin/home');
  } else {
    res.render('admin/login', { error: 'Invalid email or password' });
  }
};

exports.getAdminHome = async (req, res) => {
  res.render('admin/home');
};
exports.postTeam = async (req, res) => {
  const teamData = {
    mngName: req.body.mngName,
    team: req.body.team,
    budget: req.body.budget,
    mobileNo: req.body.mobileNo,
  };
  const newTeam = new Team(teamData);

  try {
    await newTeam.save(); // Save and wait for completion
    res.redirect('/admin/teamList');
} catch (err) {
    console.error('Error saving team data:', err);
    res.status(500).send('Error saving team data.');
}
};

exports.postAdmin = async (req, res) => {
  const playerData = {
      name: req.body.name,
      age: req.body.age,
      batsman: req.body.batsman === 'on',
      bowler: req.body.bowler === 'on',
      wicketKeeper: req.body.wicketKeeper === 'on',
      allRounder: req.body.allRounder === 'on',
      phoneNumber: req.body.phoneNumber
  };
  const newPlayer = new Player(playerData);

  try {
    await newPlayer.save(); // Save and wait for completion
    res.redirect('/admin/playerList');
} catch (err) {
    console.error('Error saving player data:', err);
    res.status(500).send('Error saving player data.');
}
};


exports.getAdminplayerList = async (req, res) => {
  try {
    const players = await Player.find({});
    // const count = players.length; 
    res.render('admin/playerList', { data: players }); // Render the players view with the fetched data
  } catch (err) {
    res.status(500).send('Error fetching player data.');
  }
};

exports.getTeamList = async (req, res) => {
  try {
    const teams = await Team.find({});
    // const count = players.length; 
    res.render('admin/teamList', { data: teams }); // Render the players view with the fetched data
  } catch (err) {
    res.status(500).send('Error fetching player data.');
  }
};

exports.getAdminConductbidding=async(req,res)=>{
  try {
    const players = await Player.find({});
    // const count = players.length; 
    res.render('admin/conductbidding', { data: players }); // Render the players view with the fetched data
  } catch (err) {
    res.status(500).send('Error fetching player data.');
  }
}

exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).send('Player not found');
    }
    res.json(player);
  } catch (error) {
    res.status(500).send('Error retrieving player');
  }
};