import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import uploadFile from '../middlewares/multer.js';

import { 
    commentOnPin, 
    createPin, 
    deleteComment, 
    deletePin, 
    getAllPins, 
    getSinglePins, 
    updatePin,
} from '../controller/pinController.js';

const router = express.Router();

//pins 
router.post("/new", isAuth, uploadFile, createPin);
router.get("/all", isAuth, getAllPins);
router.get("/:id", isAuth, getSinglePins);
router.delete("/:id", isAuth, deletePin);
router.put("/:id", isAuth, updatePin);

// comment route
router.post("/comments/:id", isAuth, commentOnPin);
router.delete("/comments/:id", isAuth, deleteComment);


export default router;