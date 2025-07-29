# HOI4 Strategy API

A Vercel-hosted API for serving Hearts of Iron IV strategy guide data.

## API Endpoints

### Country Data
```
GET /api/country?country=ARG
```
Returns economic, political, and starting condition data for a country.

### Military Data
```
GET /api/military?country=ARG
```
Returns military summary (divisions, ships, aircraft, convoys) for a country.

### Focus Tree Data
```
GET /api/focuses?country=ARG
```
Returns all valid focus IDs for a country's focus tree.

### Focus Validation
```
GET /api/validate-focus?focus_id=ARG_march_to_la_casa_rosada
```
Validates if a focus ID exists in any focus tree.

## Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel`

## Usage with ChatGPT

Instead of complex JSON navigation, ChatGPT can now make simple HTTP requests:

```
GET https://your-api.vercel.app/api/country?country=ARG
GET https://your-api.vercel.app/api/focuses?country=ARG
```

This eliminates focus hallucination by providing a definitive validation endpoint.
