package Backend;

class Account {
    String surname;
    String name;
    String password;

    public Account(String surname, String name, String password) {
        this.surname  = surname;
        this.name = name;
        this.password  = password;
    }
    void createAccount(String surname, String name, String password) {
        Account account = new Account(surname, name, password);
    }
    Account getAccount(Account account) {
        return account;
    }
    
}