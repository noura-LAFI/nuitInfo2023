const multer = require("multer");
const { getStorage, ref, uploadBytes } = require("firebase/storage");

// Function to manage file storage in memory temporarily
const uploader = multer({ storage: multer.memoryStorage() });

const uploadFile = async (req, resp) => {
  try {
    uploader.single("file")(req, resp, async (err) => {
      if (err) {
        resp
          .status(500)
          .json({
            error:
              "Une erreur s'est produite lors du téléchargement du fichier",
          });
        return;
      }
      const file = req.file;
      const storageRef = ref(getStorage(), "images/" + file.originalname);

      const metadata = {
        contentType: file.mimetype,
      };

      const url = await uploadBytes(storageRef, file.buffer, metadata);

      resp.status(200).json({ status: "ok", url: url });
    });
  } catch (error) {
    resp
      .status(500)
      .json({
        error: "Une erreur s'est produite lors de l'écriture du fichier.",
      });
  }
};

module.exports = {
  uploadFile,
};
