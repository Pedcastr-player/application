const xml2js = require("xml2js");

const parser = new xml2js.Parser({
  includeWhiteChars: true
});

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const response = await fetch(url)
    const content = await response.text();

    const data = await parser.parseStringPromise(content)

    return new Response(JSON.stringify(data), {
      status: 200
    })

  } catch (e) {
    console.error(e)
    return new Response("Error fetching the feed", { status: 500 })
  }
}
