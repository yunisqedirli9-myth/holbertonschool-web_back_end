import signUpUser from './4-user-promise.js';
import uploadPhoto from './5-photo-reject.js';

export default async function handleProfileSignup(firstName, lastName, fileName) {
  const userPromise = signUpUser(firstName, lastName);
  const photoPromise = uploadPhoto(fileName);

  const results = await Promise.allSettled([userPromise, photoPromise]);

  return results.map((result) => {
    if (result.status === 'fulfilled') {
      return { status: result.status, value: result.value };
    }
    // Rejected olanların dəyərini sadəcə String(Error) olaraq value içinə qoyuruq
    return { status: result.status, value: String(result.reason) };
  });
}
