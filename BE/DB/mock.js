function mockAPICall() {
    return new Promise((resolve, reject) => {
      // Simulate a delay of 2 seconds to mimic an API request.
      setTimeout(() => {
        const data = { message: 'Mock API response data' };
  
        // Simulate a successful response.
        const success = true;
  
        if (success) {
          resolve(data); // Resolve the promise with the data.
        } else {
          reject(new Error('Mock API request failed')); // Reject the promise with an error.
        }
      }, 2000); // Simulate a 2-second delay (2000 milliseconds).
    });
  }
    
module.exports = mockAPICall;