const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export async function getLatexFromImage(imageFile: File): Promise<string> {
  try {
    const base64Image = await convertToBase64(imageFile);

    // Call our secure server-side API instead of OpenAI directly
    const response = await fetch("/api/convert-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64Image,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to convert image");
    }

    const data = await response.json();
    return data.latex || "";
  } catch (error) {
    console.error("Error in getLatexFromImage:", error);
    throw error;
  }
}
