# In Memory database implementation using a hashmap to store the key value pairs.

## Installation.

### Pre-Requisites

Have a version of NODE(=>12) installed.

### Install Required Packages.

    # INSTALL Required NPM Packages
    npm install

    # To Start the program (will start a interactive shell)
    npm start

### Commands (not case sensitive)

    # COMMAND: SET
    # set a key value into the DB
    # i.e
    set color red

    # COMMAND: GET
    # Get the value given a key from the DB.
    # i.e
    get color

    # COMMAND: COUNT [Time Complexity - O(n) - due to linear searches]
    # Get the # of times a value appears in the DB.
    # i.e
    COUNT red

    # COMMAND: DELETE
    # Delete the key and its associated value.
    # i.e
    delete color

    # COMMAND: BEGIN
    # Create a new transaction.
    # i.e
    begin

    # COMMAND: ROLLBACK
    # ROLLBACKS all the transaction that were created after the 'BEGIN' command.
    # i.e
    rollback

    # COMMAND: COMMIT
    # COMMIT all the transaction that were created after the 'BEGIN' command to the DB.
    # i.e
    commit

    # COMMAND: END
    # Terminates the session.
    # i.e
    end

## ISSUES:
    Transactions/Rollback doesnt work as intended, it overwrites the original hashmap on every call.
