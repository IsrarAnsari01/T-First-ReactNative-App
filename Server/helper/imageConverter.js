let cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dyyioljla',
  api_key: '244399492683566',
  api_secret: 'SboIZnd0vwp7ncJe7lKUpXBJ1R4'
});


module.exports.imageConverter = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload('data:image/jpeg;base64,' +image, {
        resource_type: "image", public_id: "demo-image",
      }, function (error, result) {
        if (error) {
          console.log("Error in sending image to cloundinary", error);
          reject(error)
        }
        console.log("Successfully Send Image to cloudniary")
        resolve(result)
      });
  })
}