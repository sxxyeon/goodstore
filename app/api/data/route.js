export async function GET(request) {
  // CORS 헤더 추가
  const headers = new Headers();
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  headers.append("Access-Control-Allow-Headers", "Content-Type");

  // 예시 데이터 응답
  return new Response(
    JSON.stringify({ message: "Hello from the JSON server!" }),
    {
      headers,
      status: 200,
    }
  );
}

export async function OPTIONS() {
  const headers = new Headers();
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  headers.append("Access-Control-Allow-Headers", "Content-Type");

  return new Response(null, { headers, status: 204 });
}
