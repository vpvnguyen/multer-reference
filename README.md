# multer-reference

Simple upload server which handles uploading files using multer.

## Application Setup

- Express `server.js` serves a simple upload page for 2 different process in which uploads are handled
- Upload validation occurs within the controller or by using a custom middleware

## MemoryStorage

- Uploading very large files, or relatively small files in large numbers very quickly, can cause your application to run out of memory when memory storage is used.

## fileFilter

- Controls which files should be uploaded and skipped
- Does not account for minimum file requirement

## Error handling

- Multer will delegate error to Express
- Call multer middleware function itself within controller or pass to next function
