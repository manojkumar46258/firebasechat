package manoj_kumar12.com.firebase_chat;

import android.support.test.espresso.matcher.ViewMatchers;
import android.support.test.runner.AndroidJUnit4;
import android.test.suitebuilder.annotation.LargeTest;

import org.junit.Test;
import org.junit.runner.RunWith;

import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.assertion.ViewAssertions.matches;
import static android.support.test.espresso.matcher.ViewMatchers.isDisplayed;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class SignInActivityExpressoTest {


    @Test
    public void verifySignUpButtonDisplayed() {
        onView(ViewMatchers.withId(R.id.sign_in_button)).check(matches(isDisplayed()));
    }

}
