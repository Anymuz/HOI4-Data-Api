module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({ 
    message: 'HOI4 Data API is working!',
    timestamp: new Date().toISOString(),
    available_endpoints: [
      '/api/test',
      '/api/country?country=GER',
      '/api/focuses?country=GER', 
      '/api/military?country=GER',
      '/api/validate-focus'
    ]
  });
};
