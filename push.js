var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BPOA-yhxZfTCW8t7Vo26yHE0M_h_Onse_uWKQiisNg0B4MfXfX-DsjiIBeZ08_0cpJEKzrQfnEpQOvhP7G0vRN8",
   "privateKey": "FA-j2fXRrB4NUag88ue7nqYkCMzLS_RKGsSw6N-3qB8"
};


webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fA9NGoA7g_w:APA91bFHDUZhSr6O2dPqiEqnsogEVcByNOBXAXxc6qy3HMgbHNQCrYtAQB-c4Ic_wS3fKhea8h4l0MCCd6VYFBRMyKsCjkVheJuH8HkYcka1YaZ_eEer4JMPgVdNcDJcO3ugvhX9Y2dA",
   "keys": {
       "p256dh": "BDubC4EbwyvNbzL4xfxglgLYcn+a2RMYGJZkRoJOmc0DRJlk4jRkIH7paGxRKj1QrNdT9spY9LBRX05HtAMq1Ws=",
       "auth": "0jmrzuPbFPzfhXNttjWt6g=="
   }
};
var payload = 'Congratulation you receive notification from DiBola!';

var options = {
   gcmAPIKey: '637319968231',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
