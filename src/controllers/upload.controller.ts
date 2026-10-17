import type { Request, Response } from 'express';

export const uploadFile = (req: Request, res: Response) => {
    try {
        if (!req.file) {
            console.warn('Upload attempt failed: No file provided');
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileUrl = `/uploads/${req.file.filename}`;
        console.log(`File uploaded successfully: ${req.file.originalname} -> ${fileUrl}`);

        return res.status(200).json({
            message: 'File uploaded successfully',
            fileUrl,
            fileType: req.file.mimetype
        });
    } catch (error: any) {
        console.error('Error handling file upload:', error);
        return res.status(500).json({
            message: 'Internal server error during file upload',
            error: error.message || error
        });
    }
};
