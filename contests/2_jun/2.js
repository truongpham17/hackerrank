/**
 * @param {number} days
 * @param {number[][]} meetings
 * @return {number}
 */
var countDays = function (days, meetings) {
  meetings.push([days + 1, days + 2])
  const sortMeetings = meetings.sort((a, b) => a[0] - b[0])
  let lastMeeting = sortMeetings[0][1];
  let freeDays = sortMeetings[0][0] - 1;
  for (const meet of sortMeetings) {
    if (meet[0] > lastMeeting) {
      freeDays += meet[0] - lastMeeting - 1
    }
    lastMeeting = Math.max(lastMeeting, meet[1])
  }
  return freeDays;
};
console.log(countDays(10,
  [[5, 7], [1, 3], [9, 10]]))