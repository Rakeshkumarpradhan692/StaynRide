import axios from "axios";
function CloudinaryUpload() {
  const uploadImage = async (file) => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "staynride");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/do1ui12rk/image/upload",
        formData
      );
      return response.data?.secure_url;
    } catch (err) {
      console.log("error accur in cloudinary", err);
      return null;
    }
  };

  return { uploadImage };
}

export default CloudinaryUpload;
