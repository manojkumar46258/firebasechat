package manoj_kumar12.com.firebase_chat;

class Users {

    public String username;
    public String email;
    private CharSequence nickname;

    public Users() {
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }

    public Users(String username) {
        this.username = username;
    }

    public CharSequence getNickname() {
        return nickname;
    }

    public String username() {
        return username();
    }

    public String email() {
        return email();
    }
}