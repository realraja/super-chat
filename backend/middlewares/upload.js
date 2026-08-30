import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { UploadError } from "../utils/error.js";





export const uploadFiles = async (files = [], folderName = "") => {
    try {
        // uploads/ or uploads/folderName
        const uploadDir = folderName
            ? path.join(process.cwd(), "uploads", folderName)
            : path.join(process.cwd(), "uploads");

        // Create directory if it doesn't exist
        await fs.promises.mkdir(uploadDir, { recursive: true });

        const uploadedFiles = await Promise.all(
            files.map(async (file) => {
                const extension = path.extname(file.originalname);
                const fileName = `${randomUUID()}${extension}`;

                const filePath = path.join(uploadDir, fileName);

                await fs.promises.writeFile(filePath, file.buffer);

                return {
                    id: fileName,
                    url: folderName
                        ? `/uploads/${folderName}/${fileName}`
                        : `/uploads/${fileName}`,
                };
            })
        );

        return uploadedFiles;
    } catch (err) {
        throw new UploadError(`Error uploading files locally: ${err.message}`);
    }
};