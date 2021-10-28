const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    reservedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    annoucementId: { type: Schema.Types.ObjectId, ref: 'Annoucement', required: true },
    totalCost: { type: Number, required: true },
    status: { type: String, required: true },
    releaseDamage: {
        list: [{ type: String, required: true }],
        approved: { type: Boolean, required: true }
    },
    returnDamage: {
        list: [{ type: String, required: true }],
        approved: { type: Boolean, required: true }
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);
