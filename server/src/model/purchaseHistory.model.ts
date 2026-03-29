import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    city: {
        type: String
    },
    zipCode: {
        type: Number
    },
    country: {
        type: String
    },
    total: {
        type: Number
    }
},
    {
        timestamps: true
    }
)

export const Purchase = mongoose.model('purchase', purchaseSchema)