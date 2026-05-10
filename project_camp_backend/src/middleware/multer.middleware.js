import multer from "multer";

const storage = multer.memoryStorage(); // Keep file in memory temporarily

export const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1000 * 1000 // 10MB limit for attachments
    }
});