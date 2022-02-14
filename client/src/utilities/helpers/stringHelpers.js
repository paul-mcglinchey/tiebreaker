export const getInitials = (phrase) => {
  var initials = "";
  phrase.split(" ").forEach(w => {
    initials += w[0];
  })

  return initials;
}