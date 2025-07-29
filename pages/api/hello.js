export default function handler(req, res) {
  res.status(200).json({
    message: 'HOI4 API Working!',
    timestamp: new Date().toISOString(),
    success: true
  });
}
