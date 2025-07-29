const fs = require('fs');
const path = require('path');

// Load all knowledge base files
let knowledgeBase = {};

function loadKnowledgeBase() {
  if (Object.keys(knowledgeBase).length === 0) {
    const kbPath = path.join(process.cwd(), 'data', 'knowledge_base');
    
    try {
      knowledgeBase.start_status = JSON.parse(fs.readFileSync(path.join(kbPath, 'start_status_1936.json'), 'utf8'));
      knowledgeBase.military_oob = JSON.parse(fs.readFileSync(path.join(kbPath, 'military_oob_1936.json'), 'utf8'));
      knowledgeBase.focus_trees = JSON.parse(fs.readFileSync(path.join(kbPath, 'focus_trees.json'), 'utf8'));
      knowledgeBase.states = JSON.parse(fs.readFileSync(path.join(kbPath, 'states_1936.json'), 'utf8'));
      knowledgeBase.characters = JSON.parse(fs.readFileSync(path.join(kbPath, 'characters_1936.json'), 'utf8'));
    } catch (error) {
      console.error('Failed to load knowledge base:', error);
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
    // Get economic data
    const economicData = kb.start_status?.detailed_data?.[countryCode]?.economic_data;
    const politicalData = kb.start_status?.detailed_data?.[countryCode]?.political_data;
    const startingConditions = kb.start_status?.detailed_data?.[countryCode]?.starting_conditions;

    if (!economicData) {
      return res.status(404).json({ error: `Country ${countryCode} not found` });
    }

    const response = {
      country: countryCode,
      economic_data: {
        civilian_factories: economicData.total_civilian_factories,
        military_factories: economicData.total_military_factories,
        dockyards: economicData.total_dockyards,
        total_manpower: economicData.total_manpower,
        recruitable_manpower: economicData.recruitable_manpower,
        building_slots_available: economicData.building_slots_available
      },
      political_data: {
        research_slots: politicalData?.research_slots,
        ruling_party: politicalData?.ruling_party,
        stability: politicalData?.stability,
        war_support: politicalData?.war_support
      },
      starting_conditions: {
        convoys: startingConditions?.convoys,
        starting_ideas: startingConditions?.starting_ideas
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
