package manoj_kumar12.com.firebase_chat;

import android.util.Log;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;
import com.google.firebase.messaging.FirebaseMessaging;

/**
 * Created by Belal on 12/8/2017.
 */

//the class extending FirebaseInstanceIdService
public class MyFirebaseInstanceIDService extends FirebaseInstanceIdService {


    //this method will be called
    //when the token is generated
    @Override
    public void onTokenRefresh() {
        super.onTokenRefresh();

        //now we will have the token
        String token = FirebaseInstanceId.getInstance().getToken();
        final String FRIENDLY_ENGAGE_TOPIC = "friendly_engage";

        final String TAG = "MyFirebaseIIDService";
        //for now we are displaying the token in the log
        //copy it as this method is called only when the new token is generated
        //and usually new token is only generated when the app is reinstalled or the data is cleared
        Log.d("MyRefreshedToken", token);
        Log.d(TAG, "Refreshed token: " + token);
	// If you want to send messages to this application instance or
	// manage this apps subscriptions on the server side, send the
	// Instance ID token to your app server.


        FirebaseMessaging.getInstance().subscribeToTopic(FRIENDLY_ENGAGE_TOPIC);
        //sendRegistrationToServer(token);
    }

}
