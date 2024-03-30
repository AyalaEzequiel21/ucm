import mongoose from "mongoose";

const startSession = async () => {
    const session = await mongoose.startSession();
    return session;
}

export { startSession }