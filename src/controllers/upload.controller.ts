import type { Request, Response } from 'express';

export const uploadFile = (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({
        message: 'File uploaded successfully',
        fileUrl,
        fileType: req.file.mimetype
    });
};
