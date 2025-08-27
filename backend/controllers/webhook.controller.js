import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { Webhook } from "svix";

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }

  const payload = req.body;   // raw buffer (because of bodyParser.raw)
  const headers = req.headers;

  console.log("Webhook payload received.");

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers); // ✅ use raw buffer
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).json({
      message: "Webhook verification failed!",
    });
  }

  console.log("Incoming Headers:", headers);
  console.log("Incoming Body Buffer:", payload.toString());

  // Handle events
  if (evt.type === "user.created") {
    const data = evt.data;

    const newUser = new User({
      clerkUserId: data.id,
      username: data.username || data.email_addresses?.[0]?.email_address,
      email: data.email_addresses?.[0]?.email_address,
      img: data.image_url,  // ✅ correct property
    });

    await newUser.save();
    console.log("✅ User saved to MongoDB:", newUser);
  }

  if (evt.type === "user.deleted") {
    const deletedUser = await User.findOneAndDelete({
      clerkUserId: evt.data.id,
    });

    if (deletedUser) {
      await Post.deleteMany({ user: deletedUser._id });
      await Comment.deleteMany({ user: deletedUser._id });
      console.log("🗑️ Deleted user and related posts/comments:", deletedUser._id);
    }
  }

  return res.status(200).json({
    message: "Webhook received",
  });
};
