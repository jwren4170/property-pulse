import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET apu/properties/:id
export async function GET(request, { params }) {
  try {
    await connectDB();

    // Error handling for invalid property id
    if (!params.id) {
      return new Response(JSON.stringify({ error: "Property not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }

    // Find property by id
    const property = await Property.findById(params.id);
    return new Response(JSON.stringify(property), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
