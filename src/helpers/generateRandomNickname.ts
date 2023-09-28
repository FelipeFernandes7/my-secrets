export function generateRandomNickname(length: number): string {
  const vowels = "aeiou";
  const consonants = "bcdfghjklmnpqrstvwxyz";
  let nickname = "";

  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      nickname += consonants[Math.floor(Math.random() * consonants.length)];
    } else {
      nickname += vowels[Math.floor(Math.random() * vowels.length)];
    }
  }

  return nickname;
}
