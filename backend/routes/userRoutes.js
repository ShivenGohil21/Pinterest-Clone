// import express from 'express';
// import { registerUser, loginUser, myProfile, userProfile, followAndUnfollowUser, logOutUser } from '../controller/userController.js';
// import { isAuth } from '../middlewares/isAuth.js';

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/logout",isAuth, logOutUser);

// router.get("/me", isAuth, myProfile); // Correctly connected route

// router.get("/:id", isAuth, userProfile);
// router.post("/follow/:id", isAuth, followAndUnfollowUser);


// export default router;

import express from 'express';
import { registerUser, loginUser, myProfile, userProfile, followAndUnfollowUser, logOutUser } from '../controller/userController.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuth, logOutUser);

router.get("/me", isAuth, myProfile);
router.get("/:id", isAuth, userProfile);
router.post("/follow/:id", isAuth, followAndUnfollowUser);

export default router;
