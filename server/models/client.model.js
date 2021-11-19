const { Schema } = require("mongoose");

const SessionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    notes: { type: String, required: false },
    date: { type: Date, required: true }
  }
)

module.exports = mongoose => {
  const Client = mongoose.model(
    "clients",
    mongoose.Schema(
      {
        clientname: {
          firstName: { type: String, trim: true, required: true },
          middleNames: { type: [String], required: false },
          lastName: { type: String, trim: true, required: true }
        },
        address: { type: String, required: true },
        birthdate: { type: Date, required: true },
        contactinfo: {
          emails: [String],
          phoneNumbers: [Number]
        },
        sessions: [SessionSchema]
      },
      { timestamps: true }
    )
  );

  return Client;
};