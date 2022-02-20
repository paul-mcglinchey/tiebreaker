export const getInitials = (phrase: string) => {
  var initials = "";
  phrase.split(" ").forEach((w: string) => {
    initials += w[0];
  })

  return initials;
}