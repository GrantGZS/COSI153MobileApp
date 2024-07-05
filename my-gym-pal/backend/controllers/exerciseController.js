const axios = require('axios');

exports.getExercises = async (req, res) => {
  const { muscle } = req.params;
  try {
    const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
      headers: { 'X-Api-Key': 'D6ua3Wu3ezlSu2PtR6fpEw==OdmNECblfvJK0Brm' },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
