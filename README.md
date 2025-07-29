# HOI4 Data API

A fast, reliable API serving Hearts of Iron IV game data for strategy guide generation.

## 🚀 Live API

**Base URL**: `https://your-deployment-url.vercel.app`

## 📡 Endpoints

### Country Data
```
GET /api/country?country=ARG
```
Returns economic, political, and starting condition data.

**Example Response:**
```json
{
  "country": "ARG",
  "economic_data": {
    "civilian_factories": 11,
    "military_factories": 3,
    "dockyards": 1,
    "total_manpower": 16870360,
    "building_slots_available": 19
  },
  "political_data": {
    "research_slots": 2,
    "stability": 0.3,
    "war_support": 0.1
  }
}
```

### Military Data
```
GET /api/military?country=ARG
```
Returns military summary (divisions, ships, aircraft, convoys).

### Focus Validation (CRITICAL - Prevents Hallucination)
```
GET /api/validate-focus?focus_id=ARG_march_to_la_casa_rosada
```
**Returns:** `{"focus_id": "ARG_march_to_la_casa_rosada", "is_valid": true, "tree": "argentine_focus_tree"}`

**Fake Focus Test:**
```
GET /api/validate-focus?focus_id=ARG_fake_focus
```
**Returns:** `{"focus_id": "ARG_fake_focus", "is_valid": false, "tree": null}`

## 🎯 Usage with ChatGPT

This API eliminates focus hallucination by providing definitive validation:

1. **ChatGPT checks focus validity** before using any focus ID
2. **Only valid focuses** are used in strategy guides  
3. **100% accurate data** from actual game files

## 📊 Data Sources

- Hearts of Iron IV patch 1.17
- All DLC enabled
- Complete country coverage (95 nations)
- Real focus trees, not invented ones

## 🔧 Development

```bash
npm install
npm run dev
```

Deploy to Vercel:
```bash
npm run deploy
```
