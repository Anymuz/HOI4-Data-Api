export default function handler(req, res) {
  res.status(200).json({
    message: 'Hello from HOI4 API!',
    timestamp: new Date().toISOString(),
    working: true
  });
}
