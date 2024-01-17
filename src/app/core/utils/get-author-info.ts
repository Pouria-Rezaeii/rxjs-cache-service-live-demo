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

export function getAuthors() {
   return fakeNames.map((name, index) => ({userId: index + 1, name}));
}

export function getAuthorName(userId: number) {
   return fakeNames[userId - 1];
}

export function getAuthorImageLink(userId: number) {
   return `/assets/avatar/avatar-${userId}.png`;
}
