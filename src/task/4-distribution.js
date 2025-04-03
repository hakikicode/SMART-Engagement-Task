export function distribution(submitters, bounty, roundNumber) {
  console.log(`MAKE DISTRIBUTION LIST FOR ROUND ${roundNumber}`);

  const distributionList = {};
  const approvedSubmitters = [];

  for (const submitter of submitters) {
    if (submitter.votes === 0) {
      distributionList[submitter.publicKey] = 0;
    } else if (submitter.votes < 0) {
<<<<<<< HEAD
      distributionList[submitter.publicKey] = 0;
=======
      const slashedStake = Math.floor(submitter.stake * 0);
      distributionList[submitter.publicKey] = -slashedStake;
>>>>>>> 5f37ff8fb9e169c29c6b09e4b80907f89bcee802
    } else {
      approvedSubmitters.push(submitter.publicKey);
    }
  }

  if (approvedSubmitters.length === 0) {
    console.log("NO NODES TO REWARD");
    return distributionList;
  }

  const rewardPerNode = Math.floor(bounty / approvedSubmitters.length) || 0;
  approvedSubmitters.forEach((key) => {
    distributionList[key] = rewardPerNode;
  });

  console.log("FINAL DISTRIBUTION LIST:", distributionList);
  return distributionList;
}
