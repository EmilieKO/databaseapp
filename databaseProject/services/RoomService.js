const { sequelize } = require("../models");

class RoomService {
    constructor(db) {
        this.client = db.sequelize
        this.Room = db.Room
        this.Reservation = db.Reservation
    }
    async create(capacity, pricePerDay, hotelId) {
        return this.Room.create(
            {
                Capacity: capacity,
                PricePerDay: pricePerDay,
                hotelId: hotelId
            }
        )
    }
    async get() {
        return this.Room.findAll({
            where: {
            }, 
            include: {
                model: this.User,
                through: {
                    attribtes: ['StartDate', 'EndDate']
                }
            }
        })
    }

    async getHotelRooms(hotelId) {
        return this.Room.findAll({
            where: {
                hotelId: hotelId
            },
            include: {
                model: this.User,
                through: {
                    attributes: ['StartDate', 'EndDate']
                }
            }
        })
    }

    async deleteRoom(roomId) {
        return this.Room.destroy({
            where: {id: roomId}
        })
    }

    async rentARoom(userId, roomId, startDate, endDate) {
        return this.Reservation.create( 
            {
                RoomId: roomId,
                UserId: userId,
                startDate: startDate,
                EndDate: endDate
            }
        ).catch(function (err) {
            console.log(err)
        })
    }
}
module.exports = RoomService