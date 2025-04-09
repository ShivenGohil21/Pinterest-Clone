// import TryCatch from "../utils/TryCatch.js";
// import getDataUrl from "../utils/urlGenerator.js";
// import cloudinary from 'cloudinary';
// import { Pin } from "../models/pinModel.js";

// export const createPin = TryCatch(async (req, res)=> {
//     const {title, pin} = req.body
//     const file = req.file
//     const fileUrl = getDataUrl(file)

//     const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

//     await Pin.create({
//         title,
//         pin,
//         image: {
//             id: cloud.public_id,
//             url: cloud.secure_url,   
//         },
//         owner: req.user._id,
//     });
//     res.json({
//         message:"Pin created",
//     });
// });

// //fetch all pins -> with the help of al pin we can get the single pin
// export const getAllPins = TryCatch(async(req,res)=>{
//     const pins = await Pin.find().sort({createdAt: -1 });

//     res.json(pins);

// });

// //fetch one pins with this we can get the owner data 
// export const  getSinglePins = TryCatch(async(req,res)=>{
//     const pin = await Pin.findById(req.params.id).populate("owner", "-password");
//     res.json(pin);
// });


// //pin comment controller
// export const commentOnPin = TryCatch(async(req, res)=> {
//     console.log("User from request:", req.user); // Check if user exists
//     console.log("Comment from request:", req.body.comment); // Check comment content

//     const pin = await Pin.findById(req.params.id);

//     if(!pin) return res.status(404).json({
//         message: "No pin with this id",
//     });

//     pin.comments.push({
//         user: req.user._id,
//         name: req.user.name,
//         comment: req.body.comment,
//     });

//     await pin.save();
//     res.json({
//         message: "Comment added",
//     }); 
// });

// //deleteing comment

// export const deleteComment = TryCatch(async(req, res) => {
//     const pin = await Pin.findById(req.params.id);

//         if(!pin) 
//             return res.status(404).json({
//             message: "No pin with this id",
//         });
//         if(!req.query.commentId) 
//         return res.status(404).json({
//         message: "Please give me comment id"
//         });
//         const commentIndex = pin.comments.findIndex(
//            (item) => item._id.toString() === req.query.commentId.toString() 
//         );

//         if(commentIndex === -1) {
//             return res.status(404).json({
//                 message: "comment not found",
//             });
        
//         }
//         const comment = pin.comments[commentIndex];

//         if(comment.user.toString() === req.user._id.toString()){
//             pin.comments.splice(commentIndex, 1);

//             await pin.save();
//             return res.json({
//                 message: "comment deleted",
//             });
//         } else {
//             return res.status(403).json({
//                 message: "You are not the owner of this comment",
//             });
//         }
// });

// ///delete pin

// export const deletePin = TryCatch(async (req, res) => {
//     // Check if req.users exists
//     if (!req.users || !req.users._id) {
//         return res.status(401).json({
//             message: "User not authenticated",
//         });
//     }

//     // Fix: Correctly access the pin ID from request params
//     const pin = await Pin.findById(req.params.id);

//     if (!pin) {
//         return res.status(404).json({
//             message: "No pin with this id",
//         });
//     }

//     // Ensure the owner of the pin matches the logged-in user
//     if (pin.owner.toString() !== req.users._id.toString()) {
//         return res.status(403).json({
//             message: "Unauthorized",
//         });
//     }

//     // Ensure image ID exists before attempting to delete from Cloudinary
//     if (pin.image && pin.image.id) {
//         await cloudinary.v2.uploader.destroy(pin.image.id);
//     }

//     // Delete the pin
//     await pin.deleteOne();

//     // Respond with success
//     res.json({
//         message: "Pin Deleted",
//     });
// });

// export const updatePin = TryCatch(async(req,res)=> {
//     const pin = await Pin.findById(req.params.id);

//     if (!pin) {
//         return res.status(404).json({
//             message: "No pin with this id",
//         });
//     }

//     if (pin.owner.toString() !== req.users._id.toString()) {
//         return res.status(403).json({
//             message: "Unauthorized",
//         });
//     }
//     pin.title = req.body.title;
//     pin.pin = req.body.pin
//     await pin.save()
//     res.json({
//         message: "pin updated",
//     });

// });

import { Pin } from "../models/pinModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";

export const createPin = TryCatch(async (req, res) => {
  const { title, pin } = req.body;

  const file = req.file;
  const fileUrl = getDataUrl(file);

  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  await Pin.create({
    title,
    pin,
    image: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
    owner: req.user._id,
  });

  res.json({
    message: "Pin Created",
  });
});

export const getAllPins = TryCatch(async (req, res) => {
  const pins = await Pin.find().sort({ createdAt: -1 });

  res.json(pins);
});

export const getSinglePins = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id).populate("owner", "-password");

  res.json(pin);
});

export const commentOnPin = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id);

  if (!pin)
    return res.status(400).json({
      message: "No Pin with this id",
    });

  pin.comments.push({
    user: req.user._id,
    name: req.user.name,
    comment: req.body.comment,
  });

  await pin.save();

  res.json({
    message: "Comment Added",
  });
});

export const deleteComment = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id);

  if (!pin)
    return res.status(400).json({
      message: "No Pin with this id",
    });

  if (!req.query.commentId)
    return res.status(404).json({
      message: "Please give comment id",
    });

  const commentIndex = pin.comments.findIndex(
    (item) => item._id.toString() === req.query.commentId.toString()
  );

  if (commentIndex === -1) {
    return res.status(404).json({
      message: "Comment not found",
    });
  }

  const comment = pin.comments[commentIndex];

  if (comment.user.toString() === req.user._id.toString()) {
    pin.comments.splice(commentIndex, 1);

    await pin.save();

    return res.json({
      message: "Comment Deleted",
    });
  } else {
    return res.status(403).json({
      message: "You are not owner of this comment",
    });
  }
});

export const deletePin = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id);

  if (!pin)
    return res.status(400).json({
      message: "No Pin with this id",
    });

  if (pin.owner.toString() !== req.user._id.toString())
    return res.status(403).json({
      message: "Unauthorized",
    });

  await cloudinary.v2.uploader.destroy(pin.image.id);

  await pin.deleteOne();

  res.json({
    message: "Pin Deleted",
  });
});

export const updatePin = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id);

  if (!pin)
    return res.status(400).json({
      message: "No Pin with this id",
    });

  if (pin.owner.toString() !== req.user._id.toString())
    return res.status(403).json({
      message: "Unauthorized",
    });

  pin.title = req.body.title;
  pin.pin = req.body.pin;

  await pin.save();

  res.json({
    message: "Pin updated",
  });
});