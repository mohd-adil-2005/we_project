const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name:process.env.CLOUDE_NAME,
    api_key:process.env.CLOUDE_API_KEY,
    api_secret:process.env.CLOUDE_API_SECRETE,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust',
      allowedformats:["jpg","png","jpeg"] // supports permission jpg jpeg png
    },
  });

  module.exports={
    cloudinary,
    storage,
  };