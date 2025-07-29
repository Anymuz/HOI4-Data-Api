const fs = require('fs');
const path = require('path');

let focusData = null;

function loadFocusData() {
  if (!focusData) {
    const kbPath = path.join(process.cwd(), 'GPT', 'knowledge_base');
    try {
      focusData = JSON.parse(fs.readFileSync(path.join(kbPath, 'focus_trees.json'), 'utf8'));
    } catch (error) {
      console.error('Failed to load focus data:', error);
      focusData = {};
    }
  }
  return focusData;
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
  const fd = loadFocusData();

  try {
    // Find the country's focus tree
    let countryTree = null;
    
    // Check by country tag first
    if (fd.detailed_data?.[countryCode]) {
      countryTree = fd.detailed_data[countryCode];
    } else {
      // Search for tree by name pattern (e.g., argentine_focus_tree)
      const treeNames = Object.keys(fd.detailed_data || {});
      const possibleTreeName = treeNames.find(name => 
        name.toLowerCase().includes(countryCode.toLowerCase()) ||
        name.toLowerCase().includes('arg') && countryCode === 'ARG' ||
        name.toLowerCase().includes('ger') && countryCode === 'GER'
      );
      
      if (possibleTreeName) {
        countryTree = fd.detailed_data[possibleTreeName];
      }
    }

    if (!countryTree) {
      return res.status(404).json({ error: `Focus tree for ${countryCode} not found` });
    }

    // Extract all focus IDs
    const focusIds = countryTree.raw_tree_data?.focuses?.map(focus => focus.id) || [];
    
    const response = {
      country: countryCode,
      tree_id: countryTree.tree_id,
      total_focuses: countryTree.total_focuses,
      valid_focus_ids: focusIds
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error processing focus request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
