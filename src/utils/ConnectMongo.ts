import mongoose from 'mongoose';

export async function connectMongo() {
  const URI = 'mongodb+srv://it21akr:123@cluster0.wf4bdda.mongodb.net/?retryWrites=true&w=majority';

  try {
    await mongoose.connect(URI);
  } catch (err) {
    process.exit(1);
  }
}
