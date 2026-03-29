import mongoose from 'mongoose'

export const dbConnect = async (URI: string) => {


    try {

        await mongoose.connect(URI)
            .then(() =>
                console.log('database connected successfully')
            )
    } catch (error) {

        console.error(' Database connection failed:', error);
        process.exit(1);

    }

}