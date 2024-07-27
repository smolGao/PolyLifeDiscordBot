async function getLCUserProfile(username) {
    var response = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com'
        },
        body: JSON.stringify({
            query: `#graphql
            query getUserProfile($userSlug: String!) {
                userProfileUserQuestionProgressV2(userSlug: $userSlug) {
                    numAcceptedQuestions {
                        count
                        difficulty
                    }
                }
                matchedUser(username: $userSlug) {
                    contributions {
                      points
                    }
                    profile {
                      reputation
                      ranking
                    }
                    submissionCalendar
                    submitStats {
                      acSubmissionNum {
                        difficulty
                        count
                        submissions
                      }
                      totalSubmissionNum {
                        difficulty
                        count
                        submissions
                      }
                    }
                }
            }
        `,
            variables: { userSlug: username },
            operationName: "getUserProfile"
        })
    });


    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    data = await response.json();

    const userProfileData = data.data.userProfileUserQuestionProgressV2;
    const numAcceptedQuestions = userProfileData.numAcceptedQuestions;

    const acSubmissions = data.data.matchedUser.submitStats.acSubmissionNum[0].submissions;
    const totalSubmissions = data.data.matchedUser.submitStats.totalSubmissionNum[0].submissions;

    var res = {
        numEasySolved : numAcceptedQuestions[0].count,
        numMediumSolved : numAcceptedQuestions[1].count,
        numHardSolved : numAcceptedQuestions[2].count,
        acceptanceRate : Number((acSubmissions / totalSubmissions * 100).toFixed(2))
    };

    console.log(res);

    return res;
}

export default getLCUserProfile;
