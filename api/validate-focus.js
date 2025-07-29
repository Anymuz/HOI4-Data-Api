const fs = require('fs');
const path = require('path');

let focusData = null;

function loadFocusData() {
  if (!focusData) {
    const kbPath = path.join(process.cwd(), 'data', 'knowledge_base');
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

  const { focus_id } = req.query;
  
  if (!focus_id) {
    return res.status(400).json({ error: 'focus_id parameter required' });
  }

  const fd = loadFocusData();

  try {
    let isValid = false;
    let foundInTree = null;

    // Search all trees for the focus ID
    for (const [treeName, treeData] of Object.entries(fd.detailed_data || {})) {
      const focuses = treeData.raw_tree_data?.focuses || [];
      const found = focuses.find(focus => focus.id === focus_id);
      
      if (found) {
        isValid = true;
        foundInTree = treeName;
        break;
      }
    }

    const response = {
      focus_id: focus_id,
      is_valid: isValid,
      tree: foundInTree
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error validating focus:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
