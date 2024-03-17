import mongoose from "mongoose";

const startSession = async () => {
    const session = await mongoose.startSession();
    session.startTransaction();
    return session;
}

export { startSession }