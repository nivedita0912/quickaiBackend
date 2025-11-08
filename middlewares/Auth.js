import { clerkClient } from "@clerk/express";

async function hasPremium(user) {
  return user?.privateMetadata?.plan === "premium";
}

export const auth = async (req, res, next) => {
  try {
    const { userId } = req.auth || {};

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized – No valid user",
      });
    }

    const user = await clerkClient.users.getUser(userId);

    const hasPremiumPlan = await hasPremium(user);

    if (!hasPremiumPlan && user.privateMetadata?.free_usage) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }

    req.plan = hasPremiumPlan ? "premium" : "free";

    next();
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
};
