const SLASH_PERCENT = 0.7;

export function distribution(submitters, bounty, roundNumber) {
  console.log(`MAKE DISTRIBUTION LIST FOR ROUND ${roundNumber}`);

  const distributionList = {};
  const approvedSubmitters = [];

  for (const submitter of submitters) {
    if (submitter.votes > 0) {
      approvedSubmitters.push(submitter.publicKey);
    } else if (submitter.votes < 0) {
      const slashedStake = Math.floor(submitter.stake * SLASH_PERCENT);
      distributionList[submitter.publicKey] = -slashedStake;
    } else {
      distributionList[submitter.publicKey] = 0;
    }
  }

  if (approvedSubmitters.length === 0) {
    console.log("NO NODES TO REWARD");
    return distributionList;
  }

  const reward = Math.floor(bounty / approvedSubmitters.length);
  approvedSubmitters.forEach((candidate) => {
    distributionList[candidate] = reward;
  });

  return distributionList;
}
