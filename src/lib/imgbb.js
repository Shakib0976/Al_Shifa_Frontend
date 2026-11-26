const MAX_IMAGE_SIZE = 32 * 1024 * 1024;
const IMAGE_TYPES = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function uploadImageToImgBB(image) {
  if (
    !image ||
    typeof image === "string" ||
    image.size === 0 ||
    image.size > MAX_IMAGE_SIZE ||
    !IMAGE_TYPES.has(image.type)
  ) {
    throw new Error("Choose a supported image file smaller than 32 MB.");
  }

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error("Image hosting is not configured. Set IMGBB_API_KEY.");
  }

  const formData = new FormData();
  formData.append("image", image, image.name);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      body: formData,
    }
  );
  const result = await response.json();

  if (!response.ok || !result.success || typeof result.data?.url !== "string") {
    throw new Error(result.error?.message || "ImgBB image upload failed.");
  }

  return {
    src: result.data.display_url || result.data.url,
  };
}
