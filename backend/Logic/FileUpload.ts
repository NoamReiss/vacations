import path from "path";
import multer from "multer";
import fs from "fs";

const findImage = async (vacationId: number) => {
  const folderPath = path.join(__dirname, "../public");
  const files = fs.readdirSync(folderPath);
  const image = files.find((file) => file.startsWith(`${vacationId}_`));

  if (image) {
    return image;
  } else {
    return null;
  }
};

export const deleteImage = async (vacationId: number) => {
  const existingFile = await findImage(+vacationId);
  if (existingFile) {
    fs.unlinkSync(path.join(__dirname, "../public", existingFile));
  }
};

export const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "public");
  },
  filename: async (req: any, file: any, cb: any) => {
    const vacationId = +req.params.id;
    const originalName = file.originalname.split(".")[0];
    const ext = path.extname(file.originalname);
    const fileName = `${vacationId}_${originalName}${ext}`;
    cb(null, fileName);
    await deleteImage(+vacationId);
  },
});
const upload = multer({ storage: storage });

export default upload;
