const Notifications = require('../modals/Notifications');

module.exports = class Notifi {
    constructor(userId, targetId, message) {
        this.userId = userId;
        this.targetId = targetId;
        this.message = message;
        console.log(
            this.userId,
            this.targetId,
            this.message
        )
    }

    // Send the actual email
    async send() {

        // 2) Define options
        const Options = {
            userId: this.userId,
            targetId: this.targetId,
            message: this.message,
        };

        // 3) Create a transport and send email
        await Notifications.create(Options);
        console.log(Options.message);
    }

    
};