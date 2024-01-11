const multer = require('multer');
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
 }
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       const isValid = FILE_TYPE_MAP[file.mimetype];
       let uploadError = "Invalid image type";
 
       if(isValid){
          uploadError = null
       }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
    //   const fileName = file.originalname.replace(' ', '-');
    const extention = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extention}`)
    }
  })
  
  const uploadOptions = multer({ storage: storage })

  module.exports = uploadOptions;