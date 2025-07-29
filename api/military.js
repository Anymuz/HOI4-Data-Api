const fs = require('fs');
const path = require('path');

let knowledgeBase = {};

function loadKnowledgeBase() {
  if (Object.keys(knowledgeBase).length === 0) {
    const kbPath = path.join(process.cwd(), 'GPT', 'knowledge_base');
    
    try {
      knowledgeBase.military_oob = JSON.parse(fs.readFileSync(path.join(kbPath, 'military_oob_1936.json'), 'utf8'));
    } catch (error) {
      console.error('Failed to load military data:', error);
    }
  }
  return knowledgeBase;
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { country } = req.query;
  
  if (!country) {
    return res.status(400).json({ error: 'Country parameter required' });
  }

  const countryCode = country.toUpperCase();
  const kb = loadKnowledgeBase();

  try {
    const militaryData = kb.military_oob?.quick_military_summary?.[countryCode];

    if (!militaryData) {
      return res.status(404).json({ error: `Military data for ${countryCode} not found` });
    }

    const response = {
      country: countryCode,
      military_summary: {
        total_divisions: militaryData.total_divisions,
        total_ships: militaryData.total_ships,
        total_aircraft: militaryData.total_aircraft,
        total_convoys: militaryData.total_convoys
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error processing military request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
