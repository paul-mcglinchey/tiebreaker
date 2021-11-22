const { Schema } = require("mongoose");

const NameSchema = new Schema({
  firstName: { type: String, trim: true, required: true },
  middleNames: { type: [String], required: false },
  lastName: { type: String, trim: true, required: true }
});

const ContactInfoSchema = new Schema({
  primaryPhoneNumber: { type: String, trim: true, required: false },
  primaryEmail: { type: String, trim: true, required: false },
  emails: { type: [String], required: false },
  phoneNumbers: { type: [Number], required: false }
})

const SessionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    notes: { type: String, required: false },
    date: { type: Date, required: true }
});

module.exports = mongoose => {
  const Client = mongoose.model(
    "clients",
    mongoose.Schema(
      {
        clientname: NameSchema,
        address: { type: String, required: false },
        birthdate: { type: Date, required: true },
        contactInfo: ContactInfoSchema,
        sessions: [SessionSchema]
      },
      { timestamps: true }
    )
  );

  return Client;
};