export default function Home() {
  return (
    <div>
      <h1>HOI4 Data API</h1>
      <p>API is running!</p>
      <ul>
        <li><a href="/api/hello">/api/hello</a></li>
        <li><a href="/api/test">/api/test</a></li>
        <li><a href="/api/country?country=GER">/api/country?country=GER</a></li>
      </ul>
    </div>
  );
}
