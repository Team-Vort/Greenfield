Project is designed specifically to be deployed to Heroku, using Heroku's PostgresQL database. Refer to Heroku documentation for setup.

Due to Twillio billing concerns, and privacy, all project keys, and phone numbers have been redacted, with notes directing future programers where/when/etc. to replace with their own relevant data.

Signup at https://www.twilio.com/ for free account
Create account,
Grab AccountSid, authtoken, and phonenumber
Verify all phone numbers for individual users in database to receive text messages....

To test locally...
Set local environment variables...
vim ~/.bash_profile
Add accountSid
Add authToken
add phoneNumber

To deploy on Heroku....

go to Heroku/settings
modify- to match your specifics...
Add accountSid
Add authToken
add phoneNumber

client/components/workOrderExpanded.js
See lines 91-93 for note on making a redundant call for purposes of updating work summary counters.



