function getLCUserProfile() {
    fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com'
        },
        body: JSON.stringify({
            query: `#graphql
            query userProfileUserQuestionProgressV2($userSlug: String!) {
                userProfileUserQuestionProgressV2(userSlug: $userSlug) {
                    numAcceptedQuestions {
                        count
                        difficulty
                    }
                    numFailedQuestions {
                        count
                        difficulty
                    }
                    numUntouchedQuestions {
                        count
                        difficulty
                    }
                    userSessionBeatsPercentage {
                        difficulty
                        percentage
                    }
                }
            }
        `,
            variables: { userSlug: "YOUR_USER_NAME" },
            operationName: "userProfileUserQuestionProgressV2"
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Accessing data
            const userProfileData = data.data.userProfileUserQuestionProgressV2;
            console.log("User Profile Data:", userProfileData);

            // Example: Accessing numAcceptedQuestions
            const numAcceptedQuestions = userProfileData.numAcceptedQuestions;
            console.log("Number of Accepted Questions:", numAcceptedQuestions);

            // Example: Accessing numFailedQuestions
            const numFailedQuestions = userProfileData.numFailedQuestions;
            console.log("Number of Failed Questions:", numFailedQuestions);

            // Example: Accessing numUntouchedQuestions
            const numUntouchedQuestions = userProfileData.numUntouchedQuestions;
            console.log("Number of Untouched Questions:", numUntouchedQuestions);

            // Example: Accessing userSessionBeatsPercentage
            const userSessionBeatsPercentage = userProfileData.userSessionBeatsPercentage;
            console.log("User Session Beats Percentage:", userSessionBeatsPercentage);
        })
        .catch(error => console.error('Error:', error.message));

}

getLCUserProfile();