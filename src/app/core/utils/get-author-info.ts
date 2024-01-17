export function getAuthorImageLink(userId: number) {
   return `/assets/avatar/avatar-${userId}.png`;
}

const fakeNames = [
   "Vito R. Edwards",
   "William J. Gray",
   "Michael C. Mitchell",
   "Thomas M. Nichols",
   "Robert C. Aaron",
   "Evelyn J. McClure",
   "Lyda R. Hall",
   "Carla T. Carter",
   "Kathy E. McCoin",
   "Mary D. Fink",
];

export function getAuthorName(userId: number) {
   return fakeNames[userId - 1];
}
