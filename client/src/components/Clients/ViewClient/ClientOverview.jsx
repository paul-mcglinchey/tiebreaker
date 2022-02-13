import { profileColours } from "../../../utilities";
import { InlineButton } from "../ClientTable";

const ClientOverview = ({ client }) => {

  const { clientColour, fullName, createdAt } = client;

  var date = new Date(createdAt).toISOString().split("T")[0];

  const getInitials = (phrase) => {
    var initials = "";
    phrase.split(" ").forEach(w => {
      initials += w[0];
    })

    return initials;
  }

  const generateColour = async () => {
    return profileColours[Math.floor(Math.random() * profileColours.length)];
  }

  return (
    <div className="bg-gray-700 w-full my-10 rounded-lg text-gray-200 shadow-md">
      <div className="flex p-5 space-x-6">
        <div style={{ backgroundColor: clientColour ? clientColour : generateColour() }} className="w-32 h-32 rounded-full shadow-lg">
          <span className="text-5xl inline-block font-bold tracking-wide relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {getInitials(fullName)}
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex space-x-6">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{fullName}</h1>
              <span className="text-gray-400 tracking-wide">Member since: {date}</span>
            </div>
            <div className="flex my-2 space-x-4">
              <InlineButton color="text-green-500">Contact Info</InlineButton>
              <InlineButton color="text-blue-500">Sessions</InlineButton>
              <InlineButton color="text-red-500">Delete</InlineButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientOverview;