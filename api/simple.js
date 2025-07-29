module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  res.status(200).json({
    message: 'HOI4 API is working!',
    timestamp: new Date().toISOString(),
    endpoint: 'simple test',
    working: true
  });
};
