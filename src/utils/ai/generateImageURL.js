require("dotenv").config();

const imgBB_API = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`;

const generateImageURL = async (buffer, prompt) => {
  const formData = new FormData();
  formData.append(
    "image",
    new Blob([buffer], { type: "image/jpeg" }),
    `${prompt}.jpg`
  );
  const res = await fetch(imgBB_API, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data;
};

module.exports = generateImageURL;
