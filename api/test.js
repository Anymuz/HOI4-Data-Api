module.exports = (req, res) => {
  res.status(200).json({ 
    message: 'HOI4 Data API is working!',
    method: req.method,
    timestamp: new Date().toISOString()
  });
};
